import React, { useContext, useEffect } from "react";
import LoginContext from "../context/LoginContext";
import { Navigate } from "react-router-dom";
import API from "../api";

const ProductiveRoute = ({ children }) => {
  const { isAuth, setIsAuth } = useContext(LoginContext);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const response = await API.post("/validateToken", { token });
          if (response.data.valid) {
            setIsAuth(true);
          } else {
            setIsAuth(false);
          }
        } catch (err) {
          console.error("Token validation failed", err);
        }
      }
    };
    checkToken();
  }, [setIsAuth]);

  if (!isAuth) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProductiveRoute;
