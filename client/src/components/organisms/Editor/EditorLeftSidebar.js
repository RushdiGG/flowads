import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import ImageIcon from "@material-ui/icons/Image";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import { toggleModal } from "../../../redux/slices/modalsSlice";

const drawerWidth = 80;

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

export default function PermanentDrawerLeft({ canvas }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onTextClick = () => {
    canvas.addText("Hello");
  };

  const onImageClick = () => {
    dispatch(toggleModal({ modal: "IMAGE_GALLERY" }));
  };

  const onProductClick = () => {
    dispatch(toggleModal({ modal: "FIELD_FROM_PRODUCT" }));
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <List>
        <ListItem button key="Text" onClick={onTextClick}>
          <ListItemIcon>
            <TextFieldsIcon className={classes.icon} />
          </ListItemIcon>
        </ListItem>

        <ListItem button key="Image" onClick={onImageClick}>
          <ListItemIcon>
            <ImageIcon className={classes.icon} />
          </ListItemIcon>
        </ListItem>

        <ListItem button key="Product" onClick={onProductClick}>
          <ListItemIcon>
            <FormatListBulletedIcon className={classes.icon} />
          </ListItemIcon>
        </ListItem>
      </List>
    </Drawer>
  );
}
