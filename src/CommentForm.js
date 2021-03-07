import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function CommentForm() {
  const [ formData, setFormData ] = useState({ text: '' });

  // const { addPost, editPost } = useContext(PostContext);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name] : value
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // addComment(formData)
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
