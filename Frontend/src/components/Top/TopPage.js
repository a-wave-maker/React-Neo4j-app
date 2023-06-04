import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import axios from "axios";

function TopPage() {
  const [sorted, setSorted] = useState([]);

  const navigate = useNavigate();

  function handleClick(id) {
    navigate(`/image/${id}`);
  }

  async function sortImages(type) {
    const result = await axios.post(`/sorted/${type}`).then((res) => {
      setSorted(res.data);
    });
    return result;
  }

  useEffect(() => {}, [sorted]);

  return (
    <Container className="my-2">
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Sort by
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => sortImages("top")}>Top</Dropdown.Item>
          <Dropdown.Item onClick={() => sortImages("likes")}>
            Most liked
          </Dropdown.Item>
          <Dropdown.Item onClick={() => sortImages("dislikes")}>
            Most disliked
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Container className="my-4">
        {sorted === undefined ? (
          <>Loading...</>
        ) : (
          <Row className="justify-content-md-center">
            {sorted.map((image) => (
              <Col key={image.img.id} md="auto">
                <Card className="hoverable-small">
                  <Image
                    className="grid-img"
                    onClick={() => handleClick(image.img.id)}
                    src={image.img.url}
                    alt={image.img.title}
                    fluid="true"
                  />
                  <Card.Title>
                    Likes: {image.rating.likes} Dislikes:{" "}
                    {image.rating.dislikes}
                  </Card.Title>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </Container>
  );
}

export default TopPage;
