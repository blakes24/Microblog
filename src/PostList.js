import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTitlesFromAPI } from "./actions";

function PostList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTitlesFromAPI());
  }, [dispatch]);

  const posts = useSelector((st) => st.titles);

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Card key={post.id}>
            <Card.Title className="ml-4 mt-3">
              <Link to={`/${post.id}`}>{post.title}</Link>
            </Card.Title>
            <Card.Body className="pt-0">{post.description}</Card.Body>
          </Card>
        ))
      ) : (
        <p>No posts yet.</p>
      )}
    </>
  );
}

export default PostList;
