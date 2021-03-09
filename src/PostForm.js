import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { addPostToAPI, updatePostAPI } from "./actions/postActions";
import { useDispatch } from "react-redux";

function PostForm({ title = "", description = "", body = "", id = null }) {
  const [formData, setFormData] = useState({ title, description, body });
  const history = useHistory();
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
    id
      ? dispatch(updatePostAPI(id, formData))
      : dispatch(addPostToAPI(formData));
    history.push("/");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          required
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={formData.description}
          required
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="body">
        <Form.Label>Body</Form.Label>
        <Form.Control
          type="text"
          as="textarea"
          name="body"
          value={formData.body}
          required
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default PostForm;
