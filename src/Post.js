import { Container, Button, ButtonGroup } from "react-bootstrap";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostForm from "./PostForm";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import { deletePostAPI, getPostFromAPI } from "./actions";

function Post() {
  const { postId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const titles = useSelector((st) => st.titles);
  const posts = useSelector((st) => st.posts);
  const loading = useSelector((st) => st.loading);
  const post = posts[postId];

  useEffect(() => {
    if (!post) dispatch(getPostFromAPI(postId));
  }, [dispatch, postId, post]);

  // redirect if post doesn't exist
  if (!titles.find((post) => post.id === +postId)) return <Redirect to="/" />;

  const handleRemove = () => {
    dispatch(deletePostAPI(postId));
    history.push("/");
  };
  return (
    <Container>
      {loading && <h2>Loading...</h2>}
      {editing && (
        <PostForm
          title={post.title}
          description={post.description}
          body={post.body}
          id={postId}
        />
      )}
      {post && !editing && (
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
