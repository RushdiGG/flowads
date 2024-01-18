import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import DraggableFabricLayerItem from "../../../Elements/DraggableFabricLayerItem";
import BackgroundProperties from "./BackgroundProperties";
import ImageProperties from "./ImageProperties";
import TextProperties from "./TextProperties";

import { dispatchCanvasAction } from "../../../../redux/slices/templatesSlice";

const drawerWidth = 360;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    top: 64,
  },
  drawerPaper: {
    width: drawerWidth,
    top: 64,
  },
  icon: {
    height: 48,
    width: 48,
  },
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();
  const selectedCanvasObject = useSelector(
    (state) => state.templates.selectedCanvasObject
  );
  const layers = useSelector((state) => state.templates.layers);
  const [reverseLayers, setReverseLayers] = useState([]);
  const dispatch = useDispatch();

  const Properties = Object.freeze({
    background: <BackgroundProperties />,
    image: <ImageProperties />,
    "i-text": <TextProperties />,
  });

  useEffect(() => {
    let rev = layers
      .map((layer, i) => ({ type: layer.type, value: layer.value, index: i }))
      .reverse();
    setReverseLayers(rev);
  }, [layers]);

  const onDragEnd = (e) => {
    let from = layers.length - e.source.index - 1;
    let to = layers.length - e.destination.index - 1;
    dispatch(
      dispatchCanvasAction({
        type: "MOVE_OBJECT",
        payload: { from: from, to: to },
      })
    );
  };

  const selectBackground = () => {
    dispatch(
      dispatchCanvasAction({ type: "SELECT_BACKGROUND", payload: null })
    );
  };

  return (
    <div
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="right"
    >
      <List>
        <ListItem button key="Properties">
          <ListItemText>
            Properties {selectedCanvasObject && selectedCanvasObject.type}
          </ListItemText>
        </ListItem>
        <Divider />
        {selectedCanvasObject && Properties[selectedCanvasObject.type]}
      </List>
      <Divider />

      <List>
        <ListItem button key="Layers">
          <ListItemText>Layers</ListItemText>
        </ListItem>
      </List>
      <Divider />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="1">
          {(provided) => (
            <List innerRef={provided.innerRef} {...provided.droppableProps}>
              {reverseLayers.map((layer, i) => (
                <DraggableFabricLayerItem
                  key={i}
                  index={i}
                  objectIndex={layer.index}
                  draggableId={`layer-item-${i}`}
                  layer={layer}
                />
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
      <List>
        <ListItem button onClick={selectBackground}>
          <ListItemText>Bakgrund</ListItemText>
        </ListItem>
      </List>
    </div>
  );
}
