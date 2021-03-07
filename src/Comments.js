import { Button, Container } from 'react-bootstrap';

function Comments({ comments }) {
  return (
    <Container>
      <h3>Comments</h3>
      {comments ? (
        comments.map((comment) => (
          <div key={comment.div}>
            <Button>X</Button>
            <p>{comment.text}</p>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </Container>
  );
}

export default Comments;
