const INITIAL_STATE = { posts: {}, titles: [], loading: false };

function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ADD_POST":
      return {
        ...state,
        posts: { ...state.posts, [action.payload.id]: action.payload },
      };

    case "DELETE_POST":
      const posts = { ...state.posts };
      delete posts[action.payload];
      return { ...state, posts: posts };

    case "ADD_COMMENT":
      const post = { ...state.posts[action.payload.postId] };
      post.comments.push(action.payload.comment);
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.postId]: post,
        },
      };

    case "DELETE_COMMENT":
      const postCopy = { ...state.posts[action.payload.postId] };
      let filteredComments = postCopy.comments.filter(
        (comment) => comment.id !== action.payload.commentId
      );
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.postId]: { ...postCopy, comments: filteredComments },
        },
      };

    case "LOAD_TITLES":
      return {
        ...state,
        titles: action.payload,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
