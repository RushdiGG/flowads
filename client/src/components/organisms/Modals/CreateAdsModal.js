import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { toggleModal } from "../../../redux/slices/modalsSlice";

import { API_URL } from "../../../config";
import { newTemplate } from "../../../api";
import { dispatchGetTemplates } from "../../../redux/slices/templatesSlice";

import SelectTemplateDropdown from "../../molecules/SelectTemplateDropdown";

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

export default function CreateAdsModal() {
  const open = useSelector((state) => state.modals.createAdsModal.open);
  const history = useHistory();
  const productfeedId = useSelector(
    (state) => state.productfeeds.selectedFeed._id
  );
  const templateId = useSelector(
    (state) => state.productfeeds.selectedTemplateId
  );

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleModal({ modal: "CREATE_ADS" }));
  };

  const handleSubmit = () => {
    const url =
      API_URL +
      "/api/productfeeds/" +
      productfeedId +
      "/generate?template=" +
      templateId;
    console.log(url);
    axios({
      method: "get",
      url: url,
    }).then((res) => {
      console.log(res);
      if (res.status == 201) {
        alert("Success!");
      } else {
        alert("Failed to create adfeed");
      }
      dispatch(toggleModal({ modal: "CREATE_ADS" }));
      history.push("/feeds");
    });
  };

  useEffect(() => {
    dispatch(dispatchGetTemplates());
  }, []);

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Create Ads
        </DialogTitle>
        <DialogContent dividers>
          <SelectTemplateDropdown />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit} color="primary">
            Create adfeed from template
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
