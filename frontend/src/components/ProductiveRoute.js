import React, { useContext, useEffect, useState } from "react";
import LoginContext from "../context/LoginContext";
import { Navigate } from "react-router-dom";
import API from "../api";

const ProductiveRoute = ({ children }) => {
  const { isAuth, setIsAuth } = useContext(LoginContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await API.get("/api/validateToken", {
          withCredentials: true,
        });

        setIsAuth(response.data.isValid);
        console.log("Token validation success!");
      } catch (err) {
        console.error("Token validation failed", err);
        setIsAuth(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, [setIsAuth]);
  if (isLoading) return <div>Loading...</div>;
  if (!isAuth) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProductiveRoute;
