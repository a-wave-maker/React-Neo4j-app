import { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";

import Rating from "./Rating";
import Comments from "./Comments";
import { Card, ListGroup } from "react-bootstrap";

function MyImage({ image }) {
  const [wantBig, setWantBig] = useState(false);

  function handleImgClick() {
    setWantBig(true);
  }

  useEffect(() => {}, [image]);

  if (image === undefined) {
    return <></>;
  } else {
    return (
      <Stack gap={4}>
        <Card>
          <Image
            fluid="true"
            className="hoverable-small main-image"
            src={image.img.url}
            alt="Image?"
            onClick={handleImgClick}
          />
          <Modal show={wantBig} onHide={() => setWantBig(false)}>
            <Modal.Body>
              <Image className="no-hover" src={image.img.url} fluid="true" />
            </Modal.Body>
          </Modal>

          <ListGroup>
            <Container>
              <Col className="children-inline">
                <Rating props={{ id: image.img.id, rating: image.rating }} />
              </Col>
            </Container>
          </ListGroup>
          <ListGroup>
            <Container>
              <h5 className="children-inline">
                <b>Tags:</b>{" "}
                {image.img.tags.map((tag, index) => (
                  <div key={index}>{tag} </div>
                ))}
              </h5>
            </Container>
          </ListGroup>
          <ListGroup>
            <Container>
              <h3>by {image.author.name}</h3>
              {image.author.description}
            </Container>
          </ListGroup>
        </Card>
        <Container>
          <Comments imageId={image.img.id} />
        </Container>
      </Stack>
    );
  }
}

export default MyImage;
