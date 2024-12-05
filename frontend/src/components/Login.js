import React, { useContext } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import LoginContext from "../context/LoginContext";

const Login = () => {
  const { user, setUser, match, login } = useContext(LoginContext);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <p>User Name :</p>
      <input
        type="text"
        name="username"
        placeholder="Enter Username"
        value={user.username || ""}
        onChange={handleChange}
      />

      <p>Password : </p>
      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        value={user.password || ""}
        onChange={handleChange}
      />

      <p className="password">{match}</p>

      <button onClick={login} className="login-button">
        Login
      </button>
      <p>
        Not a Member <Link to="/signup">SignUp</Link> Now
      </p>
    </div>
  );
};

export default Login;
