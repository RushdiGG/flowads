import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { fabric } from "fabric";
import EditorNavigation from "./EditorNavigation";
import EditorLeftSidebar from "./EditorLeftSidebar";
import EditorRightSidebar from "./EditorRightSidebar";
import "./classes/FlowadsCanvas";
import UploadImageModal from "../Modals/UploadImageModal";
import FieldFromProductfeedModal from "../Modals/FieldFromProductfeedModal";
import ImageGalleryModal from "../Modals/ImageGalleryModal";

const useStyles = makeStyles((theme) => ({
  editor: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  editorWorkspace: {
    display: "flex",
    width: "100%",
    flexGrow: 1,
  },
  canvasContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
  },
  rightSidebar: {},
}));

export default function Editor2() {
  const classes = useStyles();
  const [canvas, setCanvas] = useState("");
  const [objects, setObjects] = useState([]);
  const [selectedObject, setSelectedObject] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    let f = new fabric.Canvas("canvas", {
      height: 1080,
      width: 1080,
      backgroundColor: "pink",
    });
    f.trackObjects(setObjects);
    f.trackSelected(setSelectedObject);
    setCanvas(f);
    f.load(id);
  }, []);

  useEffect(() => {
    if (!id) console.log("Editor error: Template id missing");
    if (!canvas || canvas == "") console.log("Editor error: Canvas missing");
  }, [canvas, id]);

  const handleOuterCanvasClick = (e) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      canvas.discardActiveObject();
      canvas.renderAll();
    }
  };

  return (
    <div className={classes.editor}>
      <EditorNavigation canvas={canvas} id={id} />
      <EditorLeftSidebar canvas={canvas} />
      <EditorRightSidebar
        canvas={canvas}
        objects={objects}
        className={classes.rightSidebar}
        selectedObject={selectedObject}
      />
      <div className={classes.canvasContainer} onClick={handleOuterCanvasClick}>
        <canvas id="canvas" />
      </div>
      <UploadImageModal canvas={canvas} />
      <FieldFromProductfeedModal canvas={canvas} />
      <ImageGalleryModal canvas={canvas} />
    </div>
  );
}
