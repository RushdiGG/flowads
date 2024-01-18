import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({}));

export default function ImageProperties({ selectedObject }) {
  const classes = useStyles();

  return (
    <List>
      <ListItem button>
        <ListItemText>{selectedObject.src}</ListItemText>
      </ListItem>
    </List>
  );
}
