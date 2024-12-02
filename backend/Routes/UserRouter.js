const { Router } = require("express");
const {
  signupUser,
  loginUser,
  profile,
  LogoutUser,
  getProfile,
} = require("../Controller/UserController");
const {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../Controller/TaskController");
const verifyToken = require("../Middleware/VerifyToken");
const adminCheck = require("../Middleware/AdminCheck");
const {
  getAllUsers,
  deleteUser,
  getUserTask,
} = require("../Controller/AdminController");

const UserRouter = Router();

UserRouter.post("/signup", signupUser);
UserRouter.post("/login", loginUser);
UserRouter.post("/profile", verifyToken, profile);
UserRouter.get("/getProfile", verifyToken, getProfile);
UserRouter.post("/logout", LogoutUser);

UserRouter.get("/allUsers", verifyToken, adminCheck, getAllUsers);
UserRouter.delete("/deleteUser/:userId", verifyToken, adminCheck, deleteUser);
UserRouter.get("/tasks/:userId", verifyToken, adminCheck, getUserTask);

UserRouter.get("/tasks", getTasks);
UserRouter.post("/addTask", addTask);
UserRouter.put("/tasks/:id", updateTask);
UserRouter.delete("/tasks/:id", deleteTask);

module.exports = UserRouter;
