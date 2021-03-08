import axios from "axios";
import {
  ADD_COMMENT,
  DELETE_COMMENT,
  ADD_POST,
  DELETE_POST,
  LOAD_TITLES,
  SET_LOADING,
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

export function loadTitles(titles) {
  return {
    type: LOAD_TITLES,
    payload: titles,
  };
}

export function loadingData(isLoading) {
  return {
    type: SET_LOADING,
    payload: isLoading,
  };
}

export function getTitlesFromAPI() {
  return async function (dispatch) {
    let res = await axios.get(`${BASE_URL}/posts`);
    dispatch(loadTitles(res.data));
  };
}

export function getPostFromAPI(postId) {
  return async function (dispatch) {
    dispatch(loadingData(true));
    let res = await axios.get(`${BASE_URL}/posts/${postId}`);
    dispatch(addPost(res.data));
    dispatch(loadingData(false));
  };
}

export function addPostToAPI(post) {
  return async function (dispatch) {
    let res = await axios.post(`${BASE_URL}/posts`, post);
    dispatch(addPost(res.data));
  };
}

export function updatePostAPI(postId, data) {
  return async function (dispatch) {
    let res = await axios.put(`${BASE_URL}/posts/${postId}`, data);
    dispatch(addPost(res.data));
  };
}

export function deletePostAPI(postId) {
  return async function (dispatch) {
    await axios.put(`${BASE_URL}/posts/${postId}`);
    dispatch(deletePost(postId));
  };
}

export function addCommentToAPI(postId, text) {
  return async function (dispatch) {
    let res = await axios.post(`${BASE_URL}/posts/${postId}/comments`, text);
    dispatch(addComment(postId, res.data));
  };
}
export function deleteCommentAPI(postId, commentId) {
  return async function (dispatch) {
    await axios.delete(`${BASE_URL}/posts/${postId}/comments/${commentId}`);
    dispatch(deleteComment(postId, commentId));
  };
}
