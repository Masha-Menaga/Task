import React from "react";
import "./Error.css";
import { Link } from "react-router-dom";

const Error = () => (
  <div className="dialog">
    <h1>404 - Page Not Found</h1>
    <p>We couldn't find the page you're looking for.</p>
    <Link to="/">Go to Home</Link>
  </div>
);

export default Error;
