import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { toggleModal } from "../../../redux/slices/modalsSlice";
import ModalWrapper, { DialogContent, DialogActions } from "./ModalWrapper";
import { dispatchGetProductfeeds } from "../../../redux/slices/productfeedsSlice";
import { textTypes, imageTypes } from "../../../config";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function FieldsFromProductfeedModal({ canvas }) {
  const classes = useStyles();
  let open = useSelector(
    (state) => state.modals.fieldFromProductfeedModal.open
  );
  let selectedFeed = useSelector((state) => state.templates.selectedFeed);
  let selectedProduct = useSelector((state) => state.templates.selectedProduct);
  let [selectedField, setSelectedField] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dispatchGetProductfeeds());
  }, []);

  const handleChange = (e) => {
    setSelectedField(e.target.value);
  };

  const handleSubmit = () => {
    debugger;
    let value = selectedProduct[selectedField];
    if (!value) {
      alert("No product selected");
    } else {
      if (textTypes.includes(selectedField)) {
        canvas.addText(value, true, selectedField);
      } else if (imageTypes.includes(selectedField)) {
        canvas.addImage(value, 300, true, selectedField);
      } else {
        console.log("Unknown Field type");
      }
    }
    dispatch(toggleModal({ modal: "FIELD_FROM_PRODUCT" }));
  };

  return (
    <ModalWrapper
      type="FIELD_FROM_PRODUCT"
      title="Add fields from product feed"
      open={open}
    >
      <DialogContent dividers>
        <FormControl className={classes.formControl}>
          <InputLabel id="select-field-label">Select field</InputLabel>
          <Select
            labelId="select-field-label"
            id="select-field"
            value={selectedField}
            onChange={(e) => handleChange(e)}
          >
            {selectedFeed
              ? selectedFeed.productfields.map((field, i) => {
                  return (
                    <MenuItem key={`sf-pf-${i}`} value={field}>
                      {field}
                    </MenuItem>
                  );
                })
              : false}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button autoFocus color="primary" onClick={handleSubmit}>
          Add from product
        </Button>
      </DialogActions>
    </ModalWrapper>
  );
}
