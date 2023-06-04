import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";

function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  function handleClick(id) {
    navigate(`/image/${id}`);
  }

  function searchAuthor(author) {
    setSearchText(author);
  }

  function searchTag(tag) {
    setSearchText(tag);
  }

  useEffect(() => {
    const search = async () => {
      try {
        const response = await axios.get(`/search?q=${searchText}`);
        setSearchResults(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (searchText.length <= 0) {
      setSearchResults([]);
    } else {
      search();
    }
  }, [searchText]);

  return (
    <div>
      <Form className="padded">
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </InputGroup>
        </FormGroup>
      </Form>
      <Container>
        {searchResults === undefined ? (
          <>Loading...</>
        ) : (
          <Row className="justify-content-md-center">
            {searchResults.map((image) => (
              <Col key={image.id} md="auto">
                <Card className="hoverable-small">
                  <Image
                    className="grid-img"
                    onClick={() => handleClick(image.id)}
                    src={image.url}
                    alt={image.title}
                    fluid="true"
                  />
                  <Card.Title
                    className="clickable"
                    onClick={() => handleClick(image.id)}
                  >
                    {image.title}
                  </Card.Title>
                  <Card.Subtitle
                    className="clickable"
                    onClick={() => searchAuthor(image.author)}
                  >
                    {image.author}
                  </Card.Subtitle>
                  <Card.Body className="children-inline">
                    {image.tags.map((tag, index) => {
                      return (
                        <div
                          className="clickable"
                          key={index}
                          onClick={() => searchTag(tag)}
                        >
                          {tag}{" "}
                        </div>
                      );
                    })}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default SearchPage;
