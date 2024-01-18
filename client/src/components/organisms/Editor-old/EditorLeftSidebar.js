import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import ImageIcon from "@material-ui/icons/Image";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import { toggleModal } from "../../../redux/slices/modalsSlice";
import { dispatchCanvasAction } from "../../../redux/slices/templatesSlice";
import { createFabricText } from "./EditorCanvas/modifiers";

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

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  const canvas = useSelector((state) => state.templates.canvas);

  let d = useDispatch();

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
        <ListItem
          button
          key="Text"
          onClick={() =>
            d(
              dispatchCanvasAction({
                type: "ADD_TEXT",
                payload: "Lorem ipsum",
              })
            )
          }
        >
          <ListItemIcon>
            <TextFieldsIcon className={classes.icon} />
          </ListItemIcon>
        </ListItem>

        <ListItem
          button
          key="Image"
          onClick={() => d(toggleModal({ modal: "UPLOAD_IMAGE" }))}
        >
          <ListItemIcon>
            <ImageIcon className={classes.icon} />
          </ListItemIcon>
        </ListItem>

        <ListItem
          button
          key="Product"
          onClick={() => d(toggleModal({ modal: "FIELD_FROM_PRODUCT" }))}
        >
          <ListItemIcon>
            <FormatListBulletedIcon className={classes.icon} />
          </ListItemIcon>
        </ListItem>
      </List>
    </Drawer>
  );
}
