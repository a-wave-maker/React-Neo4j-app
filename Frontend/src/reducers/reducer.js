import { createReducer } from "@reduxjs/toolkit";
import {
  EMPTY_STORE,
  FETCH_IMAGES_SUCCESS,
  GET_ALL_IMAGES_SUCCESS,
} from "../actions/actions";

const initialState = {
  images: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(FETCH_IMAGES_SUCCESS, (state, action) => {
    state.images = action.payload;
  });
  builder.addCase(GET_ALL_IMAGES_SUCCESS, (state, action) => {
    state.images = action.payload;
  });
  builder.addCase(EMPTY_STORE, (state) => {
    state.images = [];
  });
});

export default reducer;
