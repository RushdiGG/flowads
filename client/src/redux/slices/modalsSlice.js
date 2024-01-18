import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "modals",
  initialState: {
    createAdsModal: { open: false },
    newFeedModal: { open: false },
    adfeedsModal: { open: false },
    newTemplateModal: { open: false },
    productListModal: { open: false },
    uploadImageModal: { open: false },
    fieldFromProductfeedModal: { open: false },
    imageGalleryModal: { open: false },
  },

  reducers: {
    toggleModal: (state, action) => {
      let mode = action.payload.mode ? action.payload.mode : "DEFAULT";
      let modalKey = false;

      switch (action.payload.modal) {
        case "CREATE_ADS":
          modalKey = "createAdsModal";
          break;
        case "ADS_LIST":
          modalKey = "adfeedsModal";
          break;
        case "NEW_FEED":
          modalKey = "newFeedModal";
          break;
        case "NEW_TEMPLATE":
          modalKey = "newTemplateModal";
          break;
        case "PRODUCTLIST":
          modalKey = "productListModal";
          break;
        case "UPLOAD_IMAGE":
          modalKey = "uploadImageModal";
          break;
        case "IMAGE_GALLERY":
          modalKey = "imageGalleryModal";
          break;
        case "FIELD_FROM_PRODUCT":
          modalKey = "fieldFromProductfeedModal";
          break;
        default:
          break;
      }
      if (modalKey) {
        return {
          ...state,
          [modalKey]: { open: !state[modalKey].open, mode: mode },
        };
      } else {
        return state;
      }
    },
  },
});

export const { toggleModal } = slice.actions;

export default slice.reducer;
