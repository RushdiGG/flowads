import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import DraggableFabricLayerItem from "../../../molecules/DraggableFabricLayerItem";
import BackgroundProperties from "./BackgroundProperties";
import ImageProperties from "./ImageProperties";
import TextProperties from "./TextProperties";
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

export default function PermanentDrawerLeft({
  canvas,
  objects,
  selectedObject,
}) {
  const classes = useStyles();
  const [reverseObjects, setReverseObjects] = useState([]);

  const Properties = {
    image: <ImageProperties selectedObject={selectedObject} />,
    "i-text": <TextProperties selectedObject={selectedObject} />,
  };

  useEffect(() => {
    let rev = objects
      .map((object, i) => ({
        type: object.type,
        value: object.value,
        ref: object,
        index: i,
      }))
      .reverse();
    setReverseObjects(rev);
  }, [objects]);

  const onDragEnd = (e) => {
    let from = objects.length - e.source.index - 1;
    let to = objects.length - e.destination.index - 1;
    canvas.moveLayer(from, to);
  };

  const onDelete = (object) => {
    canvas.remove(object);
    canvas.renderAll();
  };

  const onSelect = (object) => {
    canvas.setActiveObject(object);
    canvas.renderAll();
  };

  return (
    <Drawer
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
            {(selectedObject && selectedObject.type) || "Background"} Properties
          </ListItemText>
        </ListItem>
        <Divider />
        {(selectedObject && Properties[selectedObject.type]) || (
          <BackgroundProperties canvas={canvas} />
        )}
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
              {reverseObjects.map((object, i) => (
                <DraggableFabricLayerItem
                  key={i}
                  index={i}
                  objectIndex={object.index}
                  onDelete={onDelete}
                  onSelect={onSelect}
                  draggableId={`layer-item-${i}`}
                  layer={object}
                />
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Drawer>
  );
}
