import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ImageIcon from "@material-ui/icons/Image";
import BackgroundColorPicker from "./BackgroundColorPicker";
import { toggleModal } from "../../../../redux/slices/modalsSlice";

const useStyles = makeStyles((theme) => ({}));

export default function BackgroundProperties({ canvas }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onBackgroundColorChange = (e) => {
    canvas.setBackgroundColor(e, () => {
      canvas.renderAll();
    });
  };

  const onBackgroundImageClick = () => {
    dispatch(toggleModal({ modal: "IMAGE_GALLERY", mode: "BACKGROUND" }));
  };

  return (
    <List>
      <ListItem>
        <ListItemText>
          <BackgroundColorPicker
            onChange={onBackgroundColorChange}
            value={canvas.backgroundColor}
          />
        </ListItemText>
      </ListItem>
      <ListItem button key="Image" onClick={onBackgroundImageClick}>
        <ListItemIcon>
          <ImageIcon />
        </ListItemIcon>
      </ListItem>
    </List>
  );
}
