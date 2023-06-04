import { useNavigate } from "react-router";

import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { Card } from "react-bootstrap";

function RelatedGrid({ images }) {
  const navigate = useNavigate();

  function handleClick(id) {
    navigate(`/image/${id}`);
  }

  if (images === undefined || images === []) {
    return <></>;
  } else {
    return (
      <Card className="full-height">
        <Row className="justify-content-md-center">
          <Card.Header>
            <h2>Related images:</h2>
          </Card.Header>
          {images.map((image) => (
            <Col key={image.id} md="auto">
              <Image
                key={image.id}
                className="hoverable-big related-img"
                onClick={() => handleClick(image.id)}
                src={image.url}
                alt={image.title}
                fluid="true"
              />
            </Col>
          ))}
        </Row>
      </Card>
    );
  }
}

export default RelatedGrid;
