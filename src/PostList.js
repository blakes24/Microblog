import { Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import PostContext from './PostContext';

function PostList() {
  const { posts } = useContext(PostContext);
  const postList = Object.keys(posts);

  return (
    <Container>
      {postList.length > 0 ? (
        postList.map((id) => (
          <Card>
            <Card.Title className="ml-4 mt-3">
              <Link to={`/${id}`}>{posts[id].title}</Link>
            </Card.Title>
            <Card.Body className="pt-0">{posts[id].description}</Card.Body>
          </Card>
        ))
      ) : (
        <p>No posts yet.</p>
      )}
    </Container>
  );
}

export default PostList;
