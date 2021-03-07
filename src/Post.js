import { Container, Button, ButtonGroup } from "react-bootstrap";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { useContext, useState } from "react";
import PostContext from "./PostContext";
import PostForm from "./PostForm";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

function Post({ remove }) {
  const { postId } = useParams();
  const history = useHistory();
  const [editing, setEditing] = useState(false);

  const { posts } = useContext(PostContext);
  const post = posts[postId];
  if (!post) return <Redirect to="/" />;

  const handleRemove = () => {
    remove(postId);
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
        />
      ) : (
        <>
          <ButtonGroup className="">
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
          <Comments comments={post.comments} />
          <CommentForm />
        </>
      )}
    </Container>
  );
}

export default Post;
