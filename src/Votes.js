import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { voteAPI } from "./actions/commonActions";

function Votes({ votes, id }) {
  const dispatch = useDispatch();
  const upVote = () => dispatch(voteAPI(id, "up"));
  const downVote = () => dispatch(voteAPI(id, "down"));
  return (
    <>
      <span>{votes} votes </span>
      <Button variant="light" size="sm" onClick={upVote}>
        <i className="bi bi-hand-thumbs-up-fill text-success"></i>
      </Button>
      <Button variant="light" size="sm" onClick={downVote}>
        <i className="bi bi-hand-thumbs-down-fill text-danger"></i>
      </Button>
    </>
  );
}

export default Votes;
