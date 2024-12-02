const User = require("../Models/User");
const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function signupUser(req, res) {
  console.log("Request received at /signup:", req.body);
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hassedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hassedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "User Registered Successfully", newUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to register user", error: err.message });
  }
}

async function profile(req, res) {
  console.log("Request received at /profile:", req.body);

  const { username, emailid, gender, age, phone, address } = req.body;

  if (!username || !emailid || !phone || !gender || !age || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.emailid = emailid;
    user.gender = gender;
    user.age = age;
    user.phone = phone;
    user.address = address;

    await user.save();
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to register user", error: err.message });
  }
}

async function loginUser(req, res) {
  const { username, password } = req.body;
  console.log("Request body:", req.body);

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRETKEY,
      { expiresIn: process.env.JWT_EXPIRETIME }
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      message: `Welcome ${user.username}!`,
      _id: user._id,
      username: user.username,
      role: user.role,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to login", error: err.message });
  }
}

async function LogoutUser(req, res, next) {
  res.cookie("authToken", {
    httpOnly: true,
  });

  res.status(200).json({
    message: "Logout successfully",
  });
}

async function getProfile(req, res) {
  try {
    console.log("Request user object:", req.user);
    const username = req.user.username;
    console.log(username);
    const user = await User.findOne({ username }).select(
      "username emailid gender age phone address"
    );
    console.log("User data fetched:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { emailid, gender, age, phone, address } = user;

    res.status(200).json({
      username,
      emailid,
      gender,
      age,
      phone,
      address,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to fetch profile", error: err.message });
  }
}

module.exports = {
  signupUser,
  loginUser,
  profile,
  LogoutUser,
  getProfile,
};
