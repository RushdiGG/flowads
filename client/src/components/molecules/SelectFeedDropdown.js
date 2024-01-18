import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { dispatchGetProductfeeds } from "../../redux/slices/productfeedsSlice";
import { selectFeed } from "../../redux/slices/templatesSlice";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectFeedDropdown() {
  const classes = useStyles();
  let feeds = useSelector((state) => state.productfeeds.feeds);
  let selectedFeed = useSelector((state) => state.templates.selectedFeed);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dispatchGetProductfeeds());
  }, []);

  const renderValue = () => {
    let title = false;
    try {
      title = selectedFeed.title;
    } catch (e) {
      console.log(e);
    }
    return title ? title : "Select Feed";
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="select-feed-label">Select feed</InputLabel>
      <Select
        labelId="select-feed-label"
        id="select-feed"
        value={selectedFeed}
        renderValue={renderValue}
        onChange={(e) => dispatch(selectFeed(e.target.value))}
      >
        {feeds.map((feed, i) => {
          return (
            <MenuItem key={`feed-option-${i}`} value={feed}>
              {feed.title}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
