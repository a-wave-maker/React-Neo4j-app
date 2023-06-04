import axios from "axios";
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    const result = await axios
      .post("/login", { email: data.email, password: data.password })
      .then((res) => {
        if (res.data.user !== undefined) {
          setIsLoggedIn(true);
          setUser(res.data.user);
          window.alert(res.data.message);
          navigate(-1);
        } else {
          window.alert(res.data.message);
        }
      });
    return result;
  };

  const handleLogout = async () => {
    setIsLoggedIn(false);
    setUser(undefined);
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{ user, isLoggedIn, handleLogin, handleLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};
