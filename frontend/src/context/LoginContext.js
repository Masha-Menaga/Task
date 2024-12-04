import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const LoginContext = createContext({});

export const LoginProvider = ({ children }) => {
 
  const [user, setUser] = useState({
    username: "",
    password: "",
    cpassword: "",
    role: "",
    emailid: "",
  });
  const [match, setMatch] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  

  const navigate = useNavigate();

  async function signup() {
    const { username, password, cpassword, role, emailid } = user;
    if (!username || !password || !cpassword || !role || !emailid) {
      setMatch("Please Fill the details");
      return;
    }
    if (username.trim().length < 3) {
      setMatch("Username must be at least 3 characters long.");
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
      setMatch("Signup Failed! PLease try again.");
    }
  }

  async function submit(profileData) {
    const { username, gender, age, phone, address } = profileData;

    if (!username || !gender || !age || !phone || !address) {
      setMatch("Please Fill the details");
      return;
    }
    if (username.trim().length < 3) {
      setMatch("Username must be at least 3 characters long.");
      return;
    }
    const validGenders = ["Male", "Female", "Other"];
    if (!validGenders.includes(gender)) {
      setMatch("Please select a valid gender.");
      return;
    }

    if (isNaN(age) || age < 18) {
      setMatch("Age must be a valid number above 18.");
      return;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setMatch("Phone number must be a 10-digit numeric value.");
      return;
    }
    if (address.trim().length < 5) {
      setMatch("Address must be at least 5 characters long.");
      return;
    }
    try {
      const response = await API.post("/api/profile", profileData);
      console.log("Profile updated:", response.data);
      setMatch("Profile Updated!  Redirecting to login...");
      navigate("/");
    } catch (err) {
      console.error("Profile update failed:", err.message);
      setMatch("Failed to update profile. Please try again.");
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
      console.error("Login error:", err.message);
      setMatch("Invalid Credentials!");
    }
  }

  async function logout() {
    try {
      await API.post("/api/logout", {}, { withCredentials: true });
      localStorage.clear();
      alert("You have logged out successfully.");
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
      setMatch("");
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
      alert("Failed to log out. Please try again.");
    }
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
