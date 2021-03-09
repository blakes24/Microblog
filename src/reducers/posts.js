const INITIAL_STATE = {};

export function posts(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ADD_POST":
      return { ...state, [action.payload.id]: action.payload };

    case "UPDATE_POST":
      const comments = [...state[action.payload.id].comments];
      return { ...state, [action.payload.id]: { ...action.payload, comments } };

    case "DELETE_POST":
      const posts = { ...state };
      delete posts[action.payload];
      return { posts };

    case "ADD_COMMENT":
      const post = { ...state[action.payload.postId] };
      post.comments.push(action.payload.comment);
      return { ...state, [action.payload.postId]: post };

    case "DELETE_COMMENT":
      const postCopy = { ...state[action.payload.postId] };
      let filteredComments = postCopy.comments.filter(
        (comment) => comment.id !== action.payload.commentId
      );
      return {
        ...state,
        [action.payload.postId]: { ...postCopy, comments: filteredComments },
      };

    case "VOTE":
      const votedPost = { ...state[action.payload.id] };
      votedPost.votes = action.payload.votes;
      return { ...state, [action.payload.id]: votedPost };

    default:
      return state;
  }
}
