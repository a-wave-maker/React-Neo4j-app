import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import MyImage from "./MyImage";
import RelatedGrid from "./RelatedGrid";

function ImagePage() {
  const [image, setImage] = useState(undefined);
  const [related, setRelated] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    const getImage = async () => {
      await axios.get(`/image/${id}`).then((res) => setImage(res.data));
    };

    const getRelated = async () => {
      await axios.get(`/related/${id}`).then((res) => setRelated(res.data));
    };

    getImage().then(getRelated());
  }, [id]);

  return (
    <Container>
      {image === undefined ? <h1>Image</h1> : <h1>"{image.img.title}"</h1>}
      <Row>
        <Col fluid="true">
          <MyImage image={image} />
        </Col>
        <Col>
          <RelatedGrid images={related} />
        </Col>
      </Row>
    </Container>
  );
}

export default ImagePage;
