import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Login from "./Login";
import Register from "./Register";

function LoginPage() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Login</h1>
          <Login />
        </Col>
        <Col>
          <h1>Register</h1>
          <Register />
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
