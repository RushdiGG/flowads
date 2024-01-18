import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { dispatchCanvasAction } from "../../../../redux/slices/templatesSlice";

const useStyles = makeStyles((theme) => ({}));

export default function BackgroundProperties() {
  const classes = useStyles();
  const selectedCanvasObject = useSelector(
    (state) => state.templates.selectedCanvasObject
  );
  const dispatch = useDispatch();

  const handleChangeFont = (e) => {
    dispatch(
      dispatchCanvasAction({
        type: "CHANGE_ITEXT_FONT",
        payload: { font: e.target.value, index: selectedCanvasObject.index },
      })
    );
  };

  return (
    <List>
      <ListItem>
        <TextField label="Value" value={selectedCanvasObject.value} />
      </ListItem>
      <ListItem>
        <TextField
          label="Opacity"
          type="number"
          value={selectedCanvasObject.opacity}
        />
      </ListItem>
      <ListItem>
        <FormControl>
          <InputLabel htmlFor="font-select">Font</InputLabel>
          <Select
            native
            value={selectedCanvasObject.fontFamily}
            onChange={handleChangeFont}
            inputProps={{
              name: "font",
              id: "font-select",
            }}
          >
            <option value={selectedCanvasObject.fontFamily}>
              {selectedCanvasObject.fontFamily}
            </option>
            <option value={"Roboto"}>Roboto</option>
            <option value={30}>Thirty</option>
          </Select>
        </FormControl>
      </ListItem>
    </List>
  );
}
