import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTitlesFromAPI } from "./actions";
import Votes from "./Votes";

function PostList() {
  const dispatch = useDispatch();
  const error = useSelector((st) => st.error);
  const loading = useSelector((st) => st.loading);

  useEffect(() => {
    dispatch(getTitlesFromAPI());
  }, [dispatch]);

  const posts = useSelector((st) => st.titles);

  // order posts by most votes
  posts.sort((a, b) => b.votes - a.votes);

  if (error) {
    return <h2>Something bad happened. Please try again later...</h2>;
  }

  return (
    <>
      {loading && <h2>Loading...</h2>}
      {posts.length > 0 ? (
        posts.map((post) => (
          <Card key={post.id}>
            <Card.Title className="ml-4 mt-3">
              <Link to={`/${post.id}`}>{post.title}</Link>
            </Card.Title>
            <Card.Body className="pt-0">{post.description} </Card.Body>
            <Card.Footer className="text-muted">
              <Votes votes={post.votes} id={post.id} />
            </Card.Footer>
          </Card>
        ))
      ) : (
        <p>No posts yet.</p>
      )}
    </>
  );
}

export default PostList;
