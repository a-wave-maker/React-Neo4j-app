import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { Form, FormControl, Button } from "react-bootstrap";

import { UserContext } from "../../contexts/UserContext";

function CommentList({ imageId }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const { user, isLoggedIn } = useContext(UserContext);

  async function handleSubmit(event) {
    if (isLoggedIn === false || comment === "") {
      // console.log("huh");
    } else {
      event.preventDefault();
      const id = parseInt(Date.now());
      const posted = await axios.post("/comment", {
        imageid: imageId,
        authorid: user.id,
        commentid: id,
        text: comment,
      });
      if (posted) {
        setComments([
          { id: id, text: comment, author: user.username },
          ...comments,
        ]);
        setComment("");
      } else {
        window.alert("Something went wrong, please try again later");
      }
    }
  }

  function sortById(arr) {
    const sorted = arr.sort((a, b) => (a.id < b.id ? 1 : -1));
    return sorted;
  }

  useEffect(() => {
    if (imageId !== undefined) {
      axios
        .get(`/comments/${imageId}`)
        .then((res) => setComments(sortById(res.data)));
    }
  }, [imageId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Comments</Card.Title>
        <Form onSubmit={handleSubmit}>
          <FormControl
            type="text"
            placeholder={
              isLoggedIn ? "Enter your comment" : "Log in to comment"
            }
            value={comment}
            disabled={!isLoggedIn}
            onChange={(event) => setComment(event.target.value)}
          />
          <Button
            type="submit"
            variant="primary"
            disabled={!isLoggedIn || comment === ""}
          >
            Add Comment
          </Button>
        </Form>
        <ListGroup>
          {comments.map((comment) => (
            <ListGroup.Item key={comment.id}>
              <b>{comment.author}: </b>
              {comment.text}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default CommentList;
