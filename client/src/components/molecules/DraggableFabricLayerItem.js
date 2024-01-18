import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import DeleteIcon from "@material-ui/icons/Delete";
import { Draggable } from "react-beautiful-dnd";

const formatDynamicType = (type) => {
  switch (type) {
    case "image_link":
      return "Product Image";
    case "title":
      return "Product Title";
    case "price":
      return "Product Price";
    case "not_dynamic":
      return "";
    default:
      return "";
  }
};
export default function DraggableFabricLayerItem({
  draggableId,
  index,
  onDelete,
  onSelect,
  layer,
}) {
  const [dynamicType, setDynamicType] = useState();

  useEffect(() => {
    const d = ((layer || {}).ref || {}).dynamicType || "";
    setDynamicType(formatDynamicType(d));
  }, [layer]);

  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <ListItem {...provided.draggableProps} innerRef={provided.innerRef}>
          <ListItemIcon>
            <div {...provided.dragHandleProps}>
              <DragIndicatorIcon />
            </div>
          </ListItemIcon>
          <ListItemText onClick={() => onSelect(layer.ref)}>
            {dynamicType != ""
              ? dynamicType
              : layer.type == "i-text"
              ? layer.ref.text
              : layer.type}
          </ListItemText>
          <ListItemIcon onClick={() => onDelete(layer.ref)}>
            <DeleteIcon />
          </ListItemIcon>
        </ListItem>
      )}
    </Draggable>
  );
}
