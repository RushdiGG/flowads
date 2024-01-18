import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import {
  dispatchGetProductfeeds,
  selectFeed,
} from "../../../redux/slices/productfeedsSlice";
import { toggleModal } from "../../../redux/slices/modalsSlice";

import { API_URL } from "../../../config";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: "center",
    height: "400px",
    width: "400px",
    alignItems: "center",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

export default function FeedList() {
  let feeds = useSelector((state) => state.productfeeds.feeds);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(dispatchGetProductfeeds());
  }, []);

  const handleViewProducts = (feed) => {
    dispatch(selectFeed(feed));
    dispatch(toggleModal({ modal: "PRODUCTLIST" }));
  };

  const handleViewAdfeeds = (feed) => {
    dispatch(selectFeed(feed));
    dispatch(toggleModal({ modal: "ADS_LIST" }));
  };

  const handleDelete = (id) => {
    axios({
      method: "delete",
      url: API_URL + "/api/productfeeds",
      data: { id: id },
    }).then((res) => {
      dispatch(dispatchGetProductfeeds());
    });
  };

  const handleCreateAdfeed = (feed) => {
    dispatch(selectFeed(feed));
    dispatch(toggleModal({ modal: "CREATE_ADS" }));
  };

  const classes = useStyles();

  return feeds.map((feed, i) => (
    <Card key={`productfeed-${i}`} className={classes.card}>
      <Typography variant="h4" component="h2">
        {feed.title}
      </Typography>
      <Typography variant="h6" component="h2">
        {feed.products.length} products{" "}
        <IconButton
          aria-label="delete"
          onClick={() => handleViewProducts(feed)}
        >
          <VisibilityIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => handleViewAdfeeds(feed)}>
          <FormatListBulletedIcon />
        </IconButton>
      </Typography>

      <Button onClick={() => handleCreateAdfeed(feed)}>Create ads</Button>
      <Button onClick={() => handleDelete(feed._id)}>Delete</Button>
    </Card>
  ));
}
