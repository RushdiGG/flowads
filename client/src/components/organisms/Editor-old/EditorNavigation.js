import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import { dispatchCanvasAction } from "../../../redux/slices/templatesSlice";
import SelectFeedDropdown from "../../Elements/SelectFeedDropdown";
import SelectProductDropdown from "../../Elements/SelectProductDropdown";
import { API_URL } from "../../../config";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: 64,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function EditorNavigation(props) {
  const classes = useStyles();
  const d = useDispatch();

  const templateId = useSelector(
    (state) => (state.templates.selectedTemplate || {})._id || "null"
  );
  const productfeedId = useSelector(
    (state) => (state.templates.selectedFeed || {})._id || "null"
  );
  const product = useSelector(
    (state) => state.templates.selectedProduct || "null"
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Link to="/">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <ArrowBackIcon />
            </IconButton>
          </Link>

          <Typography variant="h6" className={classes.title}>
            Edit template
          </Typography>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <UndoIcon />
          </IconButton>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <RedoIcon />
          </IconButton>
          <SelectFeedDropdown />
          <SelectProductDropdown />
          <Link
            to={{
              pathname: `${API_URL}/api/images/generate?template=${templateId}&productfeed=${productfeedId}&product=${product}`,
            }}
            target="_blank"
          >
            <Button color="inherit">Preview</Button>
          </Link>

          <Button
            color="inherit"
            onClick={() => {
              d(dispatchCanvasAction({ type: "DOWNLOAD_CANVAS" }));
            }}
          >
            Download
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              d(dispatchCanvasAction({ type: "SAVE_TEMPLATE" }));
            }}
          >
            Save
          </Button>
          <Button color="inherit">Save &amp; Exit</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
