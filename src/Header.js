import { Jumbotron, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <Jumbotron fluid>
      <Container>
        <header>
          <h1>Microblog</h1>
          <p>Get in the Rithm of blogging!</p>
          <NavLink to="/">Blog</NavLink>
          <NavLink to="/new" className="mx-3">
            Add a new post
          </NavLink>
        </header>
      </Container>
    </Jumbotron>
  );
}

export default Header;
