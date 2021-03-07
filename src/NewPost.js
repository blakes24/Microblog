import PostForm from './PostForm';
import { Container } from 'react-bootstrap';

function NewPost() {
  return (
    <Container>
      <h1>New Post</h1>
      <PostForm />
    </Container>
  );
}

export default NewPost;
