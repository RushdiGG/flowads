import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  clearCanvasAction,
  resetTemplateState,
  dispatchSaveTemplate,
  updateLayers,
  canvasSelection,
  dispatchCanvasAction,
  setDynamicObjectsState,
} from "../../../../redux/slices/templatesSlice";
import { fabric } from "fabric";
import {
  handleProductChange,
  addText,
  addImage,
  loadTemplate,
  toLayerFormat,
  makeSaveable,
  getDynamicObjects,
  selectObject,
  deleteObject,
  moveObject,
  selectBackground,
  setBackground,
  openImage,
  changeITextFont,
} from "./modifiers";
import NoCanvas from "./NoCanvas";
import axios from "axios";

import { API_URL } from "../../../../config";

const useStyles = makeStyles((theme) => ({
  canvasContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
  },
}));

export default function EditorCanvas() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [canvas, setCanvas] = useState(<NoCanvas />);
  const [objects, setObjects] = useState([]);
  const [dynamicObjects, setDynamicObjects] = useState([]);

  const { id } = useParams();

  const selectedTemplate = useSelector(
    (state) => state.templates.selectedTemplate
  );
  const canvasAction = useSelector((state) => state.templates.canvasAction);

  const handleObjectsUpdate = () => {
    let o = canvas.getObjects();
    // console.log(o);
    setObjects(o);
    dispatch(updateLayers(toLayerFormat(o)));
    canvas.renderAll();
  };

  useEffect(() => {
    if (canvas && canvasAction) {
      console.log(canvasAction);
      switch (canvasAction.type) {
        case "ADD_TEXT":
          addText(canvas, canvasAction.payload, () => {
            handleObjectsUpdate();
          });
          break;
        case "ADD_IMAGE":
          addImage(canvas, canvasAction.payload, (e = false) => {
            if (e) return;
            handleObjectsUpdate();
          });
          break;
        case "SELECT_OBJECT":
          selectObject(canvas, canvasAction.payload, (o) => {
            dispatch(canvasSelection(o));
          });
          break;
        case "CHANGE_ITEXT_FONT":
          changeITextFont(canvas, canvasAction.payload, (o) => {
            handleObjectsUpdate();
            dispatch(canvasSelection(o));
          });
          break;
        case "SELECT_BACKGROUND":
          selectBackground(canvas, (o) => {
            dispatch(canvasSelection(o));
          });
          break;
        case "SET_BACKGROUND":
          setBackground(canvas, canvasAction.payload, (o) => {
            handleObjectsUpdate();
            dispatch(canvasSelection(o));
          });
          break;
        case "MOVE_OBJECT":
          moveObject(
            canvas,
            dynamicObjects,
            canvasAction.payload,
            (dynamicObjects) => {
              setDynamicObjects(dynamicObjects);
              handleObjectsUpdate();
            }
          );
          break;
        case "DELETE_OBJECT":
          deleteObject(
            canvas,
            dynamicObjects,
            canvasAction.payload,
            (dynamicObjects) => {
              setDynamicObjects(dynamicObjects);
              handleObjectsUpdate();
            }
          );
          break;
        case "SELECT_PRODUCT":
          handleProductChange(
            canvas,
            dynamicObjects,
            canvasAction.payload,
            () => {
              handleObjectsUpdate();
            }
          );
          break;
        case "LOAD_TEMPLATE":
          loadTemplate(canvas, canvasAction.payload, () => {
            handleObjectsUpdate();
          });
          break;
        case "SAVE_TEMPLATE":
          makeSaveable(canvas, dynamicObjects, (json) => {
            if (!json) console.log("Error while saving");
            dispatch(dispatchSaveTemplate(id, json, dynamicObjects));
            handleObjectsUpdate();
          });

          break;
        case "DOWNLOAD_CANVAS":
          openImage(canvas);
          break;
        default:
          break;
      }
      dispatch(clearCanvasAction());
    }
  }, [canvasAction]);

  // useEffect(() => {
  //   // console.log(selectedTemplate);
  //   // console.log(canvas);
  //   if (selectedTemplate && canvas) {
  //     loadTemplate(canvas, selectedTemplate.canvas, () => {
  //       setDynamicObjects(getDynamicObjects(canvas));
  //       dispatch(setDynamicObjectsState(dynamicObjects));
  //       handleObjectsUpdate();
  //     });
  //   }
  // }, [selectedTemplate, canvas]);

  useEffect(() => {
    console.log("getting canvas");
    const url = API_URL + "/api/PageTemplates/" + id;
    axios({
      method: "get",
      url: url,
    })
      .then((res) => {
        debugger;
        let template = res.data;
        if (!template) setCanvas(NoCanvas);
        let fabricCanvas = new fabric.Canvas("canvas", {
          height: template.height,
          width: template.width,
          backgroundColor: "pink",
        });
        setCanvas(fabricCanvas);

        if (template.canvas) {
          loadTemplate(canvas, template.canvas, () => {
            setDynamicObjects(getDynamicObjects(canvas));
            dispatch(setDynamicObjectsState(dynamicObjects));
            handleObjectsUpdate();
          });
        }

        dispatch(
          dispatchCanvasAction({ type: "SELECT_BACKGROUND", payload: null })
        );
      })
      .catch((e) => {
        console.log(e);
        setCanvas(NoCanvas);
      });
    return function cleanup() {
      dispatch(resetTemplateState());
    };
  }, []);

  return (
    <div className={classes.canvasContainer}>
      <canvas id="canvas" />
    </div>
  );
}
