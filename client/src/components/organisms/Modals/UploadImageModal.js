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
import { dispatchCanvasAction } from "../../../redux/slices/templatesSlice";

import { API_URL } from "../../../config";

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

export default function UploadImageModal({ canvas }) {
  let open = useSelector((state) => state.modals.uploadImageModal.open);
  let [image, setImage] = useState("");
  let history = useHistory();

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleModal({ modal: "UPLOAD_IMAGE" }));
  };

  const handleSubmit = () => {
    var formData = new FormData();
    formData.append("input_files", image);
    formData.append("width", 300);
    axios
      .post(API_URL + "/api/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        let imgUrl = res.data.url;
        canvas.addImage(imgUrl);
        dispatch(toggleModal({ modal: "UPLOAD_IMAGE" }));
        console.log(res);
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
          Upload image
        </DialogTitle>
        <DialogContent dividers>
          <Button variant="contained" component="label">
            Upload File
            <input
              type="file"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit} color="primary">
            Save product feed
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
