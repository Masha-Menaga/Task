const User = require("../Models/User");

async function getAllUsers(req, res) {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: err.message });
  }
}

async function deleteUser(req, res) {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete user", error: err.message });
  }
}

async function getUserTask(req, res) {
  const { userId } = req.params;
  try {
    const tasks = await Task.find({ userId });
    res.status(200).json({ tasks });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch tasks", error: err.message });
  }
}

module.exports = {
  getAllUsers,
  deleteUser,
  getUserTask,
};
