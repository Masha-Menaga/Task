import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LoginContext from "../context/LoginContext";

const Signup = () => {
  const { user, setUser, match, signup, close } = useContext(LoginContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <p className="close" onClick={close}>
        &#10006;
      </p>

      <p>User Name :</p>
      <input
        type="text"
        name="username"
        placeholder="Enter Username"
        value={user.username || ""}
        onChange={handleChange}
      />
      <p>Email Id :</p>
      <input
        type="email"
        name="emailid"
        placeholder="Enter EmailId"
        value={user.emailid || ""}
        onChange={handleChange}
      />
      <p>Role :</p>
      <select name="role" value={user.role || ""} onChange={handleChange}>
        <option value="">Select</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>

      <p>Password : </p>
      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        value={user.password}
        onChange={handleChange}
      />

      <p>Confirm Password : </p>
      <input
        type="password"
        name="cpassword"
        placeholder="Enter Password Again"
        value={user.cpassword}
        onChange={handleChange}
      />

      <p className="password">{match}</p>

      <button onClick={signup}>Signup</button>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
