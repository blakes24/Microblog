import axios from "axios";
import {
  START_LOADING,
  FINISH_LOADING,
  VOTE,
  SET_ERROR,
  CLEAR_ERROR,
} from "./actionTypes";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api";

export function clearLoading() {
  return {
    type: FINISH_LOADING,
  };
}
export function startLoading() {
  return {
    type: START_LOADING,
  };
}

export function handleError(error) {
  return {
    type: SET_ERROR,
    error,
  };
}

export function clearError() {
  return {
    type: CLEAR_ERROR,
  };
}

// updates vote count for titles and posts
export function vote(id, votes) {
  return {
    type: VOTE,
    payload: { id, votes },
  };
}

export function voteAPI(postId, direction) {
  return async function (dispatch) {
    dispatch(clearError());
    try {
      let res = await axios.post(
        `${BASE_URL}/posts/${postId}/vote/${direction}`
      );
      dispatch(vote(postId, res.data.votes));
    } catch (error) {
      dispatch(handleError(error.response.data));
    }
  };
}
