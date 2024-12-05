import React, { useContext, useEffect } from "react";
import LoginContext from "../context/LoginContext";
import { Navigate } from "react-router-dom";
import API from "../api";

const ProductiveRoute = ({ children }) => {
  const { isAuth, setIsAuth } = useContext(LoginContext);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await API.post("/api/validateToken", {
          withCredentials: true,
        });
        if (response.data.valid) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (err) {
        console.error("Token validation failed", err);
        setIsAuth(false);
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
