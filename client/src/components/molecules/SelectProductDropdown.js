import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { dispatchGetProductfeeds } from "../../redux/slices/productfeedsSlice";
import { selectProduct } from "../../redux/slices/templatesSlice";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectProductDropdown({ changeProduct }) {
  const classes = useStyles();
  const [selectedProductIndex, setSelectedProductIndex] = useState();
  const selectedFeed = useSelector((state) => state.templates.selectedFeed);
  const selectedProduct = useSelector(
    (state) => state.templates.selectedProduct
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dispatchGetProductfeeds());
  }, []);

  const renderValue = () => {
    let title = false;
    try {
      title = selectedProduct.title;
    } catch (e) {
      console.log(e);
    }
    return title ? title : "Select Product";
  };

  const handleChange = (index) => {
    dispatch(selectProduct(selectedFeed.products[index]));
    changeProduct(selectedFeed.products[index]);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="select-product-label">Select product</InputLabel>
      <Select
        labelId="select-product-label"
        id="select-product"
        value={selectedProductIndex}
        renderValue={renderValue}
        onChange={(e) => handleChange(e.target.value)}
      >
        {selectedFeed && selectedFeed.products.length > 0 ? (
          selectedFeed.products
            .map((product, i) => {
              return { ...product, index: i };
            })
            .filter((product) => product.is_active)
            .map((product, i) => {
              return (
                <MenuItem key={`product-option-${i}`} value={product.index}>
                  {product.title}
                </MenuItem>
              );
            })
        ) : (
          <MenuItem value={-1}>Must select feed</MenuItem>
        )}
      </Select>
    </FormControl>
  );
}
