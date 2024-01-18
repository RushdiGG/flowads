import React from "react";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";

export default function AdfeedListItem({ index, url = "#" }) {
  return (
    <ListItem>
      <Typography variant="h6" component="h6">
        {index}
      </Typography>
      <IconButton
        aria-label="delete"
        onClick={() => {
          navigator.clipboard.writeText("working copy");
        }}
      >
        <VisibilityIcon />
      </IconButton>
    </ListItem>
  );
}
