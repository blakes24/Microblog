import { Container, Button, ButtonGroup } from "react-bootstrap";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostForm from "./PostForm";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import { deletePost } from "./actions";

function Post() {
  const { postId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);

  const posts = useSelector((st) => st.posts);
  const post = posts[postId];
  if (!post) return <Redirect to="/" />;

  const handleRemove = () => {
    dispatch(deletePost(postId));
    history.push("/");
  };
  return (
    <Container>
      {editing ? (
        <PostForm
          title={post.title}
          description={post.description}
          body={post.body}
          id={postId}
          comments={post.comments}
        />
      ) : (
        <>
          <ButtonGroup className="float-right" size="sm">
            <Button variant="primary" onClick={() => setEditing(true)}>
              Edit
            </Button>
            <Button variant="danger" onClick={handleRemove}>
              Delete
            </Button>
          </ButtonGroup>

          <article>
            <h2>{post.title}</h2>
            <p>
              <i>{post.description}</i>
            </p>
            <p>{post.body}</p>
          </article>
          <hr />
          <Comments comments={post.comments} postId={postId} />
          <CommentForm postId={postId} />
        </>
      )}
    </Container>
  );
}

export default Post;
