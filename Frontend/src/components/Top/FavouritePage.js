import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import { UserContext } from "../../contexts/UserContext";

import ChangeForm from "./ChangeForm";

function FavouritePage() {
  const [images, setImages] = useState([]);
  const { user, isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  function handleClick(id) {
    navigate(`/image/${id}`);
  }

  function handleRemove(id) {
    axios.patch(`/favourite`, { imgid: id, userid: user.id });
    const newImgs = images.filter((img) => img.id !== id);
    setImages(newImgs);
  }

  useEffect(() => {
    axios.post(`/favourites`, { userid: user.id }).then((res) => {
      setImages(res.data);
    });
  }, [user, isLoggedIn]);

  if (!isLoggedIn) {
    navigate(`/login`);
    return <></>;
  } else {
    return (
      <Container>
        <Row>
          <Col>
            <h1>Welcome {user.username}!</h1>
            <ChangeForm />
          </Col>
          <Col>
            <h2>Favourites:</h2>
            <Container className="my-4">
              {images === undefined ? (
                <>Loading...</>
              ) : (
                <Row className="justify-content-md-center">
                  {images.map((image) => (
                    <Col key={image.id} md="auto">
                      <Card className="hoverable-small">
                        <Image
                          className="grid-img"
                          onClick={() => handleClick(image.id)}
                          src={image.url}
                          alt={image.title}
                          fluid="true"
                        />
                        <Card.Title>
                          <Button
                            className="fav-button"
                            onClick={() => handleRemove(image.id)}
                          >
                            Remove favourite
                          </Button>
                        </Card.Title>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default FavouritePage;
