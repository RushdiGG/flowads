import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import { selectProduct } from "../../../redux/slices/templatesSlice";
import SelectFeedDropdown from "../../molecules/SelectFeedDropdown";
import SelectProductDropdown from "../../molecules/SelectProductDropdown";
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

export default function EditorNavigation({ canvas, id }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const selectedFeed = useSelector((state) => state.templates.selectedFeed);
  const product = useSelector((state) => state.templates.selectedProduct);

  const [previewLink, setPreviewLink] = useState("#");

  useEffect(() => {
    if (selectedFeed._id != 0 && product.id) {
      setPreviewLink(
        `${API_URL}/api/images/generate?template=${id}&productfeed=${selectedFeed._id}&product=${product.id}&preview=true`
      );
    }
  }, [selectedFeed, product]);

  const changeProduct = (product) => {
    canvas.changeProduct(product);
  };

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
          <IconButton
            edge="start"
            color="inherit"
            aria-label="undo"
            onClick={() => {
              canvas.undo();
            }}
          >
            <UndoIcon />
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="redo"
            onClick={() => {
              canvas.redo();
            }}
          >
            <RedoIcon />
          </IconButton>
          <SelectFeedDropdown />
          <SelectProductDropdown changeProduct={changeProduct} />
          <Link
            to={{
              pathname: previewLink,
            }}
            target={previewLink != "#" ? "_blank" : "_self"}
          >
            <Button color="inherit">Preview</Button>
          </Link>
          <Button
            color="inherit"
            onClick={() => {
              canvas.save(id);
            }}
          >
            Save
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
