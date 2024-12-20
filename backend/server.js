const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");

const UserRouter = require("./Routes/UserRouter");

dotenv.config();

const server = express();

server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(express.json());
server.use(cookieParser());

const corsOptions = {
  origin: process.env.REACT_APP_FRONTEND_URL,
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};
server.use(cors(corsOptions));

server.get("/", (req, res) => {
  res.status(200).json({
    message: "Succceffuly response gained to the backend",
  });
});

// server.get("/api/tasks", (req, res) => {
//   const { userId } = req.query;
//   res.status(200).json({
//     message: "Succceffuly response gained to the backend Tasks",
//   });
// });

const DBConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("Connected to DB");
  } catch (err) {
    console.error("Error: Not Connected to DB - ", err.message);
    process.exit(1);
  }
};
DBConnection();

server.use("/api", UserRouter);

server.listen(process.env.PORT || 3001, () => {
  console.log(`Server is Running in port ${process.env.PORT || 3001}`);
});
