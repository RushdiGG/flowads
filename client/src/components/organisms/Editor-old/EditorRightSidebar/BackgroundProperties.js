import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { dispatchCanvasAction } from "../../../../redux/slices/templatesSlice";
import BackgroundColorPicker from "./BackgroundColorPicker";

const useStyles = makeStyles((theme) => ({}));

export default function BackgroundProperties() {
  const classes = useStyles();
  const selectedCanvasObject = useSelector(
    (state) => state.templates.selectedCanvasObject
  );
  const dispatch = useDispatch();

  const onBackgroundColorChange = (e) => {
    dispatch(
      dispatchCanvasAction({
        type: "SET_BACKGROUND",
        payload: { property: "COLOR", value: e },
      })
    );
  };

  return (
    <List>
      <ListItem>
        <ListItemText>
          <BackgroundColorPicker
            onChange={onBackgroundColorChange}
            defaultValue={selectedCanvasObject.backgroundColor}
          />
        </ListItemText>
      </ListItem>
    </List>
  );
}
