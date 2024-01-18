import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { setSelectedTemplateId } from "../../redux/slices/productfeedsSlice";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectTemplateDropdown() {
  const classes = useStyles();
  const templates = useSelector((state) => state.templates.templates);
  const [selected, setSelected] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSelectedTemplateId(selected));
  }, [selected]);

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="select-feed-label">Select feed</InputLabel>
      <Select
        labelId="select-feed-label"
        id="select-feed"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        {templates.map((template, i) => {
          return (
            <MenuItem key={`feed-option-${i}`} value={template._id}>
              {template.title}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
