import axios from "axios";
import {
  ADD_COMMENT,
  DELETE_COMMENT,
  ADD_POST,
  DELETE_POST,
  LOAD_TITLES,
  START_LOADING,
  FINISH_LOADING,
  VOTE,
  SET_ERROR,
  CLEAR_ERROR,
} from "./actionTypes";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api";

export function addPost(post) {
  return {
    type: ADD_POST,
    payload: post,
  };
}

export function deletePost(id) {
  return {
    type: DELETE_POST,
    payload: id,
  };
}

export function addComment(postId, comment) {
  return {
    type: ADD_COMMENT,
    payload: { postId, comment },
  };
}

export function deleteComment(postId, commentId) {
  return {
    type: DELETE_COMMENT,
    payload: { postId, commentId },
  };
}

export function vote(id, votes) {
  return {
    type: VOTE,
    payload: { id, votes },
  };
}

export function loadTitles(titles) {
  return {
    type: LOAD_TITLES,
    payload: titles,
  };
}

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

function handleError(error) {
  return {
    type: SET_ERROR,
    error,
  };
}

function clearError() {
  return {
    type: CLEAR_ERROR,
  };
}

export function getTitlesFromAPI() {
  return async function (dispatch) {
    dispatch(clearError());
    try {
      let res = await axios.get(`${BASE_URL}/posts`);
      dispatch(loadTitles(res.data));
    } catch (error) {
      dispatch(handleError(error.response.data));
    }
  };
}

export function getPostFromAPI(postId) {
  return async function (dispatch) {
    dispatch(clearError());
    dispatch(startLoading());
    try {
      let res = await axios.get(`${BASE_URL}/posts/${postId}`);
      dispatch(addPost(res.data));
    } catch (error) {
      dispatch(handleError(error.response.data));
    }
    dispatch(clearLoading());
  };
}

export function addPostToAPI(post) {
  return async function (dispatch) {
    dispatch(clearError());
    try {
      let res = await axios.post(`${BASE_URL}/posts`, post);
      dispatch(addPost(res.data));
    } catch (error) {
      dispatch(handleError(error.response.data));
    }
  };
}

export function updatePostAPI(postId, data) {
  return async function (dispatch) {
    dispatch(clearError());
    try {
      let res = await axios.put(`${BASE_URL}/posts/${postId}`, data);
      dispatch(addPost(res.data));
    } catch (error) {
      dispatch(handleError(error.response.data));
    }
  };
}

export function deletePostAPI(postId) {
  return async function (dispatch) {
    dispatch(clearError());
    try {
      await axios.delete(`${BASE_URL}/posts/${postId}`);
      dispatch(deletePost(postId));
    } catch (error) {
      dispatch(handleError(error.response.data));
    }
  };
}

export function addCommentToAPI(postId, text) {
  return async function (dispatch) {
    dispatch(clearError());
    try {
      let res = await axios.post(`${BASE_URL}/posts/${postId}/comments`, text);
      dispatch(addComment(postId, res.data));
    } catch (error) {
      dispatch(handleError(error));
      console.log(error);
    }
  };
}

export function deleteCommentAPI(postId, commentId) {
  return async function (dispatch) {
    dispatch(clearError());
    try {
      await axios.delete(`${BASE_URL}/posts/${postId}/comments/${commentId}`);
      dispatch(deleteComment(postId, commentId));
    } catch (error) {
      dispatch(handleError(error.response.data));
    }
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
