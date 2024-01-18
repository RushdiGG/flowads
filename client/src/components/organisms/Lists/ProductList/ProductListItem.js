import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

export default function ProductListItem({
  checked = false,
  handleCheck,
  title = "No title",
  index,
}) {
  return (
    <ListItem>
      <Checkbox checked={checked} onChange={(e) => handleCheck(e, index)} />
      <Typography variant="h6" component="h6">
        {title}
      </Typography>
    </ListItem>
  );
}
