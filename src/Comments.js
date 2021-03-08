import { Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteCommentAPI } from "./actions";

function Comments({ comments, postId }) {
  const dispatch = useDispatch();
  const remove = (commentId) => dispatch(deleteCommentAPI(postId, commentId));
  return (
    <>
      <h3>Comments</h3>
      {comments ? (
        comments.map((comment) => (
          <Row key={comment.id} className="m-2">
            <button
              onClick={() => remove(comment.id)}
              type="button"
              className="close mr-2"
              aria-label="Close"
            >
              <span aria-hidden="true" className="text-danger">
                &times;
              </span>
            </button>
            <span>{comment.text}</span>
          </Row>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </>
  );
}

export default Comments;
