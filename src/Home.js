import PostList from './PostList';
import { Container } from 'react-bootstrap';

function Home() {
  return (
    <Container className="text-left">
      <p>
        Welcome to <b>Microblog</b>, our innovative site for communicating on the information superhighway.
      </p>
      <PostList />
    </Container>
  );
}

export default Home;
