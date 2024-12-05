const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function signupUser(req, res) {
  const { username, password, role, emailid } = req.body;
  console.log("Request received at /signup:", req.body);
  if (!["admin", "user"].includes(role)) {
    return res.status(400).json({ message: "Invalid role specified" });
  }
  if (!username || !password || !role || !emailid) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      role,
      emailid,
    });

    res.status(201).json({ message: "User Registered Successfully", newUser });
  } catch (err) {
    console.error("Signup error:", err);
    res
      .status(500)
      .json({ message: "Failed to register user", error: err.message });
  }
}

async function profile(req, res) {
  console.log("Request received at /profile:", req.body);

  const { username, gender, age, phone, address } = req.body;

  if (!username || !phone || !gender || !age || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
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

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
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
      process.env.JWT_SECRETKEY || "defaultsecret",
      { expiresIn: process.env.JWT_EXPIRETIME || "1h" }
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 3600000,
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

async function LogoutUser(req, res, next) {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.status(200).json({
    message: "Logout successfully",
  });
}

async function validateToken(req, res) {
  try {
    res.status(200).json({ isValid: true, username: req.user.username });
  } catch (err) {
    res.status(401).json({ isValid: false, message: "Invalid token" });
  }
}

module.exports = {
  signupUser,
  loginUser,
  profile,
  getProfile,
  LogoutUser,
  validateToken,
};
