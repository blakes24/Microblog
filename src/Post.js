import { Container, Button, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostForm from "./PostForm";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import { deletePostAPI, getPostFromAPI } from "./actions/postActions";
import Votes from "./Votes";

function Post() {
  const { postId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const error = useSelector((st) => st.error);
  const titles = useSelector((st) => st.titles);
  const loading = useSelector((st) => st.loading);
  const posts = useSelector((st) => st.posts);
  const post = posts[postId];

  useEffect(() => {
    if (!post) dispatch(getPostFromAPI(postId));
  }, [dispatch, postId, post]);

  // redirect if post doesn't exist
  if (!titles.find((post) => post.id === +postId))
    return <h2>Page not found.</h2>;

  if (error) {
    console.log(error);
    return <h2>Cannot load post. Please try again later...</h2>;
  }

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
          <div className="float-right">
            <Row>
              <Button
                variant="primary"
                size="sm"
                className="mr-2"
                onClick={() => setEditing(true)}
              >
                Edit
              </Button>
              <Button variant="danger" size="sm" onClick={handleRemove}>
                Delete
              </Button>
            </Row>
            <Row className="mt-1">
              <Votes votes={post.votes} id={post.id} />
            </Row>
          </div>

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
