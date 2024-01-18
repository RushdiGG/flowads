import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import update from "immutability-helper";

import { API_URL } from "../../config";

export const slice = createSlice({
  name: "productfeeds",
  initialState: {
    selectedFeed: {
      title: "No Product feed selected",
      products: [],
      fields: [],
      _id: "",
    },
    selectedTemplateId: "",
    feeds: [],
  },
  reducers: {
    selectFeed: (state, action) => {
      return { ...state, selectedFeed: action.payload };
    },
    setSelectedTemplateId: (state, action) => {
      return { ...state, selectedTemplateId: action.payload };
    },
    updateProductfeeds: (state, action) => {
      return { ...state, feeds: action.payload };
    },
    toggleProduct: (state, action) => {
      return {
        ...state,
        selectedFeed: {
          ...state.selectedFeed,
          products: update(state.selectedFeed.products, {
            [action.payload.index]: {
              is_active: { $set: action.payload.status },
            },
          }),
        },
      };
    },
  },
});

export const {
  selectFeed,
  updateProductfeeds,
  toggleProduct,
  setSelectedTemplateId,
} = slice.actions;

export const dispatchGetProductfeeds = () => (dispatch) => {
  // console.log("getting feeds");
  const url = API_URL + "/api/productfeeds";
  axios({
    method: "get",
    url: url,
  }).then((res) => {
    dispatch(updateProductfeeds(res.data));
  });
};

export const dispatchUpdateProductfeed = (id, products) => (dispatch) => {
  const url = API_URL + "/api/productfeeds/" + id;
  axios({
    method: "post",
    url: url,
    data: products,
  }).then((res) => {
    // console.log("res");
    dispatch(dispatchGetProductfeeds());
  });
};

export default slice.reducer;
