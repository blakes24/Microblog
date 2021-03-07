import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function PostList() {
  const posts = useSelector((st) => st.posts);
  const postList = Object.keys(posts);

  return (
    <>
      {postList.length > 0 ? (
        postList.map((id) => (
          <Card key={id}>
            <Card.Title className="ml-4 mt-3">
              <Link to={`/${id}`}>{posts[id].title}</Link>
            </Card.Title>
            <Card.Body className="pt-0">{posts[id].description}</Card.Body>
          </Card>
        ))
      ) : (
        <p>No posts yet.</p>
      )}
    </>
  );
}

export default PostList;
