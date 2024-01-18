import React, { useState, useEffect } from "react";
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
import ImageGallery from "../Lists/ImageGallery";

import { getImages } from "../../../api";

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

export default function ImageGalleryModal({ canvas }) {
  let open = useSelector((state) => state.modals.imageGalleryModal.open);
  let imageGalleryModal = useSelector(
    (state) => state.modals.imageGalleryModal
  );
  let [images, setImages] = useState([]);
  let [selectedImage, setSelectedImage] = useState(-1);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleModal({ modal: "IMAGE_GALLERY" }));
  };

  const selectImageFromGallery = () => {
    if (selectedImage < 0) console.log("No image selected");
    if (imageGalleryModal.mode && imageGalleryModal.mode == "BACKGROUND") {
      canvas.setBackgroundImageCover(images[selectedImage].url);
    } else {
      canvas.addImage(images[selectedImage].url);
    }

    dispatch(toggleModal({ modal: "IMAGE_GALLERY" }));
  };

  const uploadImage = () => {
    dispatch(toggleModal({ modal: "IMAGE_GALLERY" }));
    dispatch(toggleModal({ modal: "UPLOAD_IMAGE" }));
  };

  useEffect(() => {
    getImages().then((res) => {
      setImages(res.data.images);
    });
  }, []);

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth={"lg"}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Select image
        </DialogTitle>
        <DialogContent dividers>
          <ImageGallery
            images={images}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={uploadImage} color="primary">
            Upload Image
          </Button>
          <Button autoFocus onClick={selectImageFromGallery} color="primary">
            Select
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
