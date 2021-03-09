import axios from "axios";
import {
  startLoading,
  clearLoading,
  handleError,
  clearError,
} from "./commonActions";
import {
  ADD_COMMENT,
  DELETE_COMMENT,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
} from "./actionTypes";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api";

export function addPost(post) {
  return {
    type: ADD_POST,
    payload: post,
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
      dispatch(handleError(error));
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
      dispatch(handleError(error));
    }
  };
}

export function updatePost(post) {
  return {
    type: UPDATE_POST,
    payload: post,
  };
}

export function updatePostAPI(postId, data) {
  return async function (dispatch) {
    dispatch(clearError());
    try {
      let res = await axios.put(`${BASE_URL}/posts/${postId}`, data);
      dispatch(updatePost({ ...res.data }));
    } catch (error) {
      dispatch(handleError(error));
    }
  };
}

export function deletePost(id) {
  return {
    type: DELETE_POST,
    payload: id,
  };
}

export function deletePostAPI(postId) {
  return async function (dispatch) {
    dispatch(clearError());
    try {
      await axios.delete(`${BASE_URL}/posts/${postId}`);
      dispatch(deletePost(postId));
    } catch (error) {
      dispatch(handleError(error));
    }
  };
}

export function addComment(postId, comment) {
  return {
    type: ADD_COMMENT,
    payload: { postId, comment },
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

export function deleteComment(postId, commentId) {
  return {
    type: DELETE_COMMENT,
    payload: { postId, commentId },
  };
}

export function deleteCommentAPI(postId, commentId) {
  return async function (dispatch) {
    dispatch(clearError());
    try {
      await axios.delete(`${BASE_URL}/posts/${postId}/comments/${commentId}`);
      dispatch(deleteComment(postId, commentId));
    } catch (error) {
      dispatch(handleError(error));
    }
  };
}
