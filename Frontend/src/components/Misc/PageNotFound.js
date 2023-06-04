import Container from "react-bootstrap/esm/Container";

const PageNotFound = ({ location }) => (
  <Container>
    <h3>Couldn't find element: {location.pathname}</h3>
  </Container>
);

export default PageNotFound;
