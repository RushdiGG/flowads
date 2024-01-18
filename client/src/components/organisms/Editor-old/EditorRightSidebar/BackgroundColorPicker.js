import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ColorPicker from "material-ui-color-picker";
import { reduxForm, Field } from "redux-form";

const useStyles = makeStyles((theme) => {});

const ColorPickerField = ({ defaultValue, input: { onChange } }) => {
  const [color, setColor] = useState();
  const handleChange = (color) => {
    setColor(color);
    onChange(color);
  };
  return (
    <ColorPicker
      name="color"
      defaultValue={defaultValue}
      value={color}
      onChange={handleChange}
    />
  );
};

const BackgroundColorPicker = ({ onChange, defaultValue }) => {
  const classes = useStyles();
  const handleSubmit = () => {};
  return (
    <form onSubmit={handleSubmit} className={classes.colorPicker}>
      <Field
        name="color"
        component={ColorPickerField}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </form>
  );
};

export default reduxForm({
  form: "background-color", // a unique identifier for this form
})(BackgroundColorPicker);
