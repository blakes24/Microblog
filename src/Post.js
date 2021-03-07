import { Container, Button, ButtonGroup } from 'react-bootstrap';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { useContext, useState } from 'react';
import PostContext from './PostContext';
import PostForm from './PostForm';

function Post({ remove }) {
  const { postId } = useParams();
  const history = useHistory();
  const [ editing, setEditing ] = useState(false);

  const { posts } = useContext(PostContext);
  const post = posts[postId];
  if (!post) return <Redirect to="/" />;

  const handleRemove = () => {
    remove(postId);
    history.push('/');
  };
  return (
    <Container>
      {editing ? (
        <PostForm title={post.title} description={post.description} body={post.body} id={postId} />
      ) : (
        <div>
          <ButtonGroup>
            <Button variant="primary" onClick={() => setEditing(true)}>
              Edit
            </Button>
            <Button variant="danger" onClick={handleRemove}>
              Delete
            </Button>
          </ButtonGroup>

          <article>
            <h1>{post.title}</h1>
            <h2>
              <i>{post.description}</i>
            </h2>
            <p>{post.body}</p>
          </article>
        </div>
      )}
    </Container>
  );
}

export default Post;
