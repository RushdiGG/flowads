import React from "react";
import { useSelector, useDispatch } from "react-redux";
import List from "@material-ui/core/List";
import Sort from "../Sort";
import { toggleProduct } from "../../../../redux/slices/productfeedsSlice";
import ProductListItem from "./ProductListItem";

export default function ProductList() {
  const products = useSelector(
    (state) => state.productfeeds.selectedFeed.products
  );
  const dispatch = useDispatch();

  const handleCheck = (event, index) => {
    dispatch(toggleProduct({ index: index, status: event.target.checked }));
  };

  return (
    <List>
      <Sort by="status" order="asc">
        {products &&
          products.map((product, i) => (
            <ProductListItem
              key={`product-${i}`}
              index={i}
              checked={product.is_active}
              handleCheck={handleCheck}
              title={product.title}
            />
          ))}
      </Sort>
    </List>
  );
}
