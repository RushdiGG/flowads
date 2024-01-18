import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { API_URL } from "../../config";

export const slice = createSlice({
  name: "templates",
  initialState: {
    templates: [],
    selectedTemplate: null,
    selectedCanvasObject: null,
    selectedFeed: {
      _id: 0,
      productfields: [],
      products: [],
    },
    selectedProduct: {
      title: "Select Product",
    },
    dynamicObjectsState: null,
    canvasAction: null,
    layers: [],
  },
  reducers: {
    updateTemplates: (state, action) => {
      return { ...state, templates: action.payload };
    },
    selectTemplate: (state, action) => {
      return {
        ...state,
        selectedTemplate: action.payload,
        dynamicObjects: action.payload.dynamicObjects || null,
      };
    },
    resetTemplateState: (state, action) => {
      return state.initialState;
    },
    selectFeed: (state, action) => {
      return { ...state, selectedFeed: action.payload };
    },
    selectProduct: (state, action) => {
      return {
        ...state,
        selectedProduct: action.payload,
      };
    },
    dispatchCanvasAction: (state, action) => {
      return {
        ...state,
        canvasAction: {
          type: action.payload.type,
          payload: action.payload.payload,
        },
      };
    },
    canvasSelection: (state, action) => {
      return {
        ...state,
        selectedCanvasObject: action.payload,
      };
    },
    clearCanvasAction: (state, action) => {
      return { ...state, canvasAction: null };
    },
    updateLayers: (state, action) => {
      return { ...state, layers: action.payload };
    },
    setDynamicObjectsState: (state, action) => {
      return { ...state, dynamicObjectsState: action.payload };
    },
  },
});

export const {
  updateTemplates,
  selectTemplate,
  selectFeed,
  selectProduct,
  dispatchCanvasAction,
  canvasSelection,
  clearCanvasAction,
  resetTemplateState,
  updateLayers,
  setDynamicObjectsState,
} = slice.actions;

export const dispatchGetTemplates = () => (dispatch) => {
  const url = API_URL + "/api/templates";
  axios({
    method: "get",
    url: url,
  }).then((res) => {
    dispatch(updateTemplates(res.data));
  });
};

// export const dispatchGetTemplate = (id) => (dispatch) => {
//   const url = API_URL + "/api/PageTemplates/" + id;
//   axios({
//     method: "get",
//     url: url,
//   }).then((res) => {
//     dispatch(selectTemplate(res.data));
//   });
// };

export const dispatchSaveTemplate =
  (id, canvas, dynamicObjects) => async (dispatch) => {
    if (!id || !canvas) return;
    const url = API_URL + "/api/templates/" + id;
    axios({
      method: "post",
      url: url,
      data: { canvas: canvas, dynamicObjects: dynamicObjects },
    }).then((res) => {
      console.log(res.data);
    });
  };

export default slice.reducer;
