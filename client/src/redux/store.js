import { configureStore } from "@reduxjs/toolkit";
import productfeedsReducer from "./slices/productfeedsSlice";
import templatesReducer from "./slices/templatesSlice";
import modalsReducer from "./slices/modalsSlice";

export default configureStore({
  reducer: {
    productfeeds: productfeedsReducer,
    templates: templatesReducer,
    modals: modalsReducer,
  },
});
