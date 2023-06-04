import axios from "axios";

export const FETCH_IMAGES_SUCCESS = "FETCH_IMAGES_SUCCESS";
export const FETCH_IMAGES_ERROR = "FETCH_IMAGES_ERROR";
export const GET_ALL_IMAGES_SUCCESS = "GET_ALL_IMAGES_SUCCESS";
export const GET_ALL_IMAGES_ERROR = "GET_ALL_IMAGES_ERROR";
export const EMPTY_STORE = "EMPTY_STORE";

export function fetchImages() {
  return async (dispatch) => {
    try {
      const response = await axios.get("/images");
      const images = response.data;
      dispatch(fetchImagesSuccess(images));
    } catch (error) {
      dispatch(fetchImagesError(error));
    }
  };
}

export function getAllImages() {
  return async (dispatch) => {
    try {
      const response = await axios.get("/images/all");
      const images = response.data;
      dispatch(getAllImagesSuccess(images));
    } catch (error) {
      dispatch(getAllImagesError(error));
    }
  };
}

export function emptyStore() {
  return { type: EMPTY_STORE };
}

export function fetchImagesSuccess(images) {
  return {
    type: FETCH_IMAGES_SUCCESS,
    payload: images,
  };
}

export function fetchImagesError(error) {
  return {
    type: FETCH_IMAGES_ERROR,
    payload: error,
  };
}

export function getAllImagesSuccess(images) {
  return {
    type: GET_ALL_IMAGES_SUCCESS,
    payload: images,
  };
}

export function getAllImagesError(error) {
  return {
    type: GET_ALL_IMAGES_ERROR,
    payload: error,
  };
}
