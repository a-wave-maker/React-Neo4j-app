import React, { useContext, useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import axios from "axios";

import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router";

const ChangeForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const navigate = useNavigate();

  const { user, isLoggedIn, handleLogout } = useContext(UserContext);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleDelete = async () => {
    if (!oldPassword) {
      window.alert("Please enter your old password");
      return;
    }
    if (window.confirm("This action is irreversible. Are you sure?")) {
      await axios.delete(`/user/${user.id}`).then((res) => {
        if (res) {
          window.alert("Deletion successful");
          handleLogout();
          navigate("/");
        } else {
          window.alert("Something went wrong. Please try again later");
        }
      });
    } else {
      // They clicked no
    }
  };

  const handleSubmit = async (e) => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    e.preventDefault();
    if (!oldPassword) {
      window.alert("Please enter your old password");
      return;
    } else {
      await axios
        .patch("/user", {
          id: user.id,
          data: {
            username: username,
            password: password,
            oldPassword: oldPassword,
          },
        })
        .then((res) => {
          if (res === false) {
            window.alert("Something went wrong. Please try again later");
          } else {
            handleLogout();
            window.alert(res.data);
          }
        });
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Container>
      <h3>Modify your account:</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Old Password:
          <br />
          <input
            type="password"
            value={oldPassword}
            onChange={handleOldPasswordChange}
            required
          />
        </label>
        <br />
        <label>
          New Username:
          <br />
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          New Password:
          <br />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <br />
        <Button type="submit">Submit Changes</Button>
      </form>
      <br />
      <Button onClick={handleDelete}>Delete account</Button>
    </Container>
  );
};

export default ChangeForm;
