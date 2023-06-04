import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";

import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/esm/FormLabel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { UserContext } from "../../contexts/UserContext";

function Login() {
  const { handleLogin } = useContext(UserContext);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.password) {
          errors.password = "Required";
        } else if (values.password.length < 1) {
          errors.password = "Input password";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          handleLogin(values);
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isValid, errors, touched }) => (
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <Form>
                <FormGroup controlId="email">
                  <FormLabel>Email</FormLabel>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className={`form-control ${
                      errors.email && touched.email ? "is-invalid" : ""
                    }`}
                  />
                  <FormControl.Feedback type="invalid">
                    {errors.email}
                  </FormControl.Feedback>
                </FormGroup>
                <FormGroup controlId="password">
                  <FormLabel>Password</FormLabel>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className={`form-control ${
                      errors.password && touched.password ? "is-invalid" : ""
                    }`}
                  />
                  <FormControl.Feedback type="invalid">
                    {errors.password}
                  </FormControl.Feedback>
                </FormGroup>
                <Button type="submit" disabled={!isValid}>
                  Login
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </Formik>
  );
}

export default Login;
