import React from "react";
import { useNavigate } from "react-router";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

function ImageGrid({ images }) {
  const navigate = useNavigate();

  function handleClick(id) {
    navigate(`/image/${id}`);
  }

  if (images === undefined) {
    return <>Loading</>;
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        {images.map((image) => (
          <Col key={image.id} md="auto">
            <Image
              key={image.id}
              className="hoverable-big grid-img"
              onClick={() => handleClick(image.id)}
              src={image.url}
              alt={image.title}
              fluid="true"
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ImageGrid;
