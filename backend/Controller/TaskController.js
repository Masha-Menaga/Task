const Task = require("../Models/Task");
const User = require("../Models/User");

async function addTask(req, res) {
  console.log("task Entered", req.body);

  const { userId, title, description, status } = req.body;

  if (!userId || !title || !description) {
    return res
      .status(400)
      .json({ message: "userId, title, and description are required." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      console.error("User not found for ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found:", user);

    const newTask = await Task.create({ userId, title, description, status });
    console.log("New task created:", newTask);

    await newTask.save();

    res.status(201).json({ message: "Task created successfully", newTask });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create Task", error: err.message });
  }
}

async function getTasks(req, res) {
  const { userId } = req.query;
  try {
    const tasks = await Task.find({ userId });
    if (!tasks) {
      return res.status(400).json({ message: "No task Found" });
    }
    res.status(200).json({ tasks });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch tasks", error: err.message });
  }
}

async function updateTask(req, res) {
  console.log("Enter backend Update");
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });

    res
      .status(200)
      .json({ message: "Task updated successfully", updatedTask: task });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update task",
      error: err.message,
      details: err.stack,
    });
  }
}

async function deleteTask(req, res) {
  console.log("enter  backend for delete");
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete task", error: err.message });
  }
}

module.exports = {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
};
