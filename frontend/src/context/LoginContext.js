import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const LoginContext = createContext({});

export const LoginProvider = ({ children }) => {
  // const [uname, setUname] = useState("");
  // const [pass, setPass] = useState(" ");
  // const [name, setName] = useState("");
  // const [password, setPassword] = useState(" ");
  // const [cpass, setCpass] = useState(" ");
  const [user, setUser] = useState({
    username: "",
    password: "",
    cpassword: "",
    role: "",
  });
  const [match, setMatch] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  // const [role, setRole] = useState("");

  const navigate = useNavigate();

  async function signup() {
    const { username, password, cpassword, role, emailid } = user;
    if (!username || !password || !cpassword || !role || !emailid) {
      setMatch("Please Fill the details");
      return;
    }
    if (password !== cpassword) {
      setMatch("Password Mismatch!");
      return;
    }

    try {
      const response = await API.post("/api/signup", {
        username,
        password,
        role,
        emailid,
      });
      console.log("Signup successful:", response.data);

      setMatch("Signup Successful");

      setIsAuth(true);

      localStorage.setItem("role", role);
      console.log(role);

      navigate("/profile");
      // if (role === "admin") {
      //   navigate("/admin");
      // } else {
      //   navigate("/user");
      // }
    } catch (err) {
      console.log(err.message);
      setMatch("Signup Failed!");
    }
  }

  async function submit(profileData) {
    const role = localStorage.getItem("role");
    const { username, gender, age, phone, address } = user;
    if (role !== "admin" && role !== "user") {
      setMatch("Unauthorized action!");
      return;
    }
    if (!username || !gender || !age || !phone || !address) {
      setMatch("Please Fill the details");
      return;
    }
    try {
      const response = await API.post("/api/profile", profileData);
      console.log("Profile updated:", response.data);

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      console.error("Profile update failed:", err);
      setMatch("Failed to update profile!");
    }
  }

  async function login() {
    const { username, password } = user;
    if (!username || !password) {
      setMatch("Please Fill the details");
      return;
    }

    try {
      const response = await API.post("/api/login", {
        username,
        password,
      });
      const { _id, role, username: responseUsername } = response.data;

      console.log(`${role} Login successful: `, response.data);

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ _id, role, username: responseUsername })
      );

      setUser({ username: responseUsername, role });
      setMatch("Login Successful!");
      setIsAuth(true);

      role === "admin" ? navigate("/admin") : navigate("/user");
    } catch (err) {
      console.error(err);
      setMatch("Invalid Credentials!");
    }
  }

  async function logout() {
    await API.post("/api/logout", {}, { withCredentials: true });
    console.log("Logout successful");

    setUser({
      username: "",
      password: "",
      cpassword: "",
      role: "",
      emailid: "",
      gender: "",
      age: "",
      phone: "",
      address: "",
    });
    setIsAuth(false);
    setMatch("Logout Successful!");
    navigate("/");
  }

  function close() {
    navigate("*");
  }

  return (
    <LoginContext.Provider
      value={{
        // pass,
        // setPass,
        // cpass,
        // setCpass,

        // uname,
        // setUname,
        // username,
        // setUsername,
        // password,
        // setPassword,
        user,
        setUser,
        match,
        signup,
        login,
        close,
        isAuth,
        logout,
        submit,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
