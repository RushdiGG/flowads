import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { toggleModal } from "../../../redux/slices/modalsSlice";

import { API_URL } from "../../../config";
import { newTemplate } from "../../../api";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function NewTemplateModal() {
  let open = useSelector((state) => state.modals.newTemplateModal.open);
  let [title, setTitle] = useState("");
  let [width, setWidth] = useState();
  let [height, setHeight] = useState();
  let history = useHistory();

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleModal({ modal: "NEW_TEMPLATE" }));
  };

  const handleSubmit = () => {
    newTemplate(title).then((res) => {
      dispatch(toggleModal({ modal: "NEW_TEMPLATE" }));
      history.push(`/Editor/${res.data.id}`);
    });
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          New template
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            id="outlined-title"
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            id="outlined-width"
            label="Width"
            variant="outlined"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
          <TextField
            id="outlined-height"
            label="Height"
            variant="outlined"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit} color="primary">
            Create template
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
