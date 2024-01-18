import React from "react";
import { useSelector, useDispatch } from "react-redux";
import List from "@material-ui/core/List";
import Sort from "../Sort";
import { toggleProduct } from "../../../../redux/slices/productfeedsSlice";
import AdfeedListItem from "./AdfeedListItem";

export default function ProductList() {
  const feeds = useSelector((state) => state.productfeeds.selectedFeed.adfeeds);
  const dispatch = useDispatch();

  const handleCheck = (event, index) => {
    dispatch(toggleProduct({ index: index, status: event.target.checked }));
  };

  return (
    <List>
      <Sort by="status" order="asc">
        {feeds &&
          feeds.map((feed, i) => (
            <AdfeedListItem key={`product-${i}`} index={i} url={feed} />
          ))}
      </Sort>
    </List>
  );
}
