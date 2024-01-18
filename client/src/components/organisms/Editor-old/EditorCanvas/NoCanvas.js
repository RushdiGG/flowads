import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  noCanvasContainer: {
    width: "800px",
    height: "800px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function NoCanvas() {
  const classes = useStyles();
  return (
    <div className={classes.noCanvasContainer}>
      <div>Couldnt load canvas</div>
    </div>
  );
}
