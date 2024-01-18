import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { toggleModal } from "../../../redux/slices/modalsSlice";
import { dispatchGetProductfeeds } from "../../../redux/slices/productfeedsSlice";
import ModalWrapper, { DialogContent, DialogActions } from "./ModalWrapper";

import { API_URL } from "../../../config";

export default function FieldsFromProductfeedModal() {
  let open = useSelector((state) => state.modals.newFeedModal.open);
  let [url, setUrl] = useState("");
  let [title, setTitle] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = () => {
    axios({
      method: "post",
      url: API_URL + "/api/productfeeds",
      data: { url: url, title: title },
    }).then((res) => {
      dispatch(toggleModal({ modal: "NEW_FEED" }));
      dispatch(dispatchGetProductfeeds());
    });
  };

  return (
    <ModalWrapper type="NEW_FEED" title="Add new feed" open={open}>
      <DialogContent dividers>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="URL"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus color="primary" onClick={handleSubmit}>
          Save product feed
        </Button>
      </DialogActions>
    </ModalWrapper>
  );
}
