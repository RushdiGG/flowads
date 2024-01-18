import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { toggleModal } from "../../../redux/slices/modalsSlice";
import ProductList from "../Lists/ProductList";
import List from "@material-ui/core/List";
import {
  dispatchUpdateProductfeed,
  dispatchGetProductfeeds,
} from "../../../redux/slices/productfeedsSlice";

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

export default function ProductListModal() {
  let open = useSelector((state) => state.modals.productListModal.open);
  let selectedFeed = useSelector((state) => state.productfeeds.selectedFeed);

  const dispatch = useDispatch();

  const handleSave = (id = "", products) => {
    const url = API_URL + "/api/productfeeds/" + id;
    axios({
      method: "put",
      url: url,
      data: products,
    }).then((res) => {
      dispatch(dispatchGetProductfeeds());
    });
    dispatch(toggleModal({ modal: "PRODUCTLIST" }));
  };

  const handleClose = () => {
    dispatch(toggleModal({ modal: "PRODUCTLIST" }));
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Products
        </DialogTitle>
        <DialogContent dividers>
          <ProductList />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => handleSave(selectedFeed._id, selectedFeed.products)}
            color="primary"
          >
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
