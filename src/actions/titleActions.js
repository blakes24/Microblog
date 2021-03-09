import axios from "axios";
import { LOAD_TITLES } from "./actionTypes";
import {
  handleError,
  clearError,
  clearLoading,
  startLoading,
} from "./commonActions";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api";

export function loadTitles(titles) {
  return {
    type: LOAD_TITLES,
    payload: titles,
  };
}

export function getTitlesFromAPI() {
  return async function (dispatch) {
    dispatch(clearError());
    dispatch(startLoading());
    try {
      let res = await axios.get(`${BASE_URL}/posts`);
      dispatch(loadTitles(res.data));
    } catch (error) {
      dispatch(handleError(error));
    }
    dispatch(clearLoading());
  };
}
