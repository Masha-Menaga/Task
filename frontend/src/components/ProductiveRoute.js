import React, { useContext } from "react";
import LoginContext from "../context/LoginContext";
import { Navigate } from "react-router-dom";

const ProductiveRoute = ({ children }) => {
  const { isAuth } = useContext(LoginContext);
  if (!isAuth) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProductiveRoute;
