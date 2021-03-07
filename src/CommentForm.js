import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addComment } from "./actions";
import { nanoid } from "nanoid";

function CommentForm({ postId }) {
  const [formData, setFormData] = useState({ text: "" });
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(addComment(postId, { ...formData, id: nanoid() }));
  };

  return (
    <Form inline onSubmit={handleSubmit}>
      <Form.Control
        type="text"
        name="text"
        aria-label="comment"
        placeholder="Add a comment"
        value={formData.text}
        required
        onChange={handleChange}
      />
      <Button variant="primary" type="submit">
        Add
      </Button>
    </Form>
  );
}

export default CommentForm;
