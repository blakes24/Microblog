import { Jumbotron, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Jumbotron fluid>
      <Container>
        <header>
          <h1>Microblog</h1>
          <p>Get in the Rithm of blogging!</p>
          <Link to="/" className="mx-2">
            Blog
          </Link>
          <Link to="/new" className="mx-2">
            Add a new post
          </Link>
        </header>
      </Container>
    </Jumbotron>
  );
}

export default Header;
