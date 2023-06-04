import { useNavigate } from "react-router";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

function Navigation() {
  const navigate = useNavigate();
  const { isLoggedIn, handleLogout } = useContext(UserContext);

  function handleFavourites() {
    navigate("/favourites");
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container className="container-normal">
        <Container className="container-normal">
          <Navbar.Brand onClick={() => navigate("/home")}>
            Normalart
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/home")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/search")}>Search</Nav.Link>
            <Nav.Link onClick={() => navigate("/top")}>Sort</Nav.Link>
          </Nav>
        </Container>
        {isLoggedIn ? (
          <Nav.Item className="justify-content-end">
            <Row>
              <Col>
                <Button onClick={handleFavourites}>Profile</Button>
              </Col>
              <Col>
                <Button onClick={handleLogout}>Log out</Button>
              </Col>
            </Row>
          </Nav.Item>
        ) : (
          <Nav.Item>
            <Container className="justify-content-end">
              <Button onClick={() => navigate("/login")}>Log in</Button>
            </Container>
          </Nav.Item>
        )}
      </Container>
    </Navbar>
  );
}

export default Navigation;
