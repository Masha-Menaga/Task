import React, { useEffect, useState } from "react";
import "./ViewTask.css";
import API from "../api";

const ViewTask = () => {
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || {}
  );
  console.log("enter task");
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [newTask, setNewTask] = useState({
    userId: loggedInUser._id,
    title: "",
    description: "",
    status: "Pending",
  });
  console.log(newTask);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser =
        JSON.parse(localStorage.getItem("loggedInUser")) || {};
      setLoggedInUser(updatedUser);
      setNewTask((prevTask) => ({
        ...prevTask,
        userId: updatedUser._id || "",
      }));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      console.log("UseEffect WOrks");
      try {
        const response = await API.get(`/api/tasks?userId=${loggedInUser._id}`);
        setTasks(response.data.tasks);
        console.log(response.data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err.message);
      }
    };

    if (loggedInUser?._id) {
      fetchTasks();
    }
  }, [loggedInUser?._id]);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  // };

  const saveTask = async () => {
    if (!newTask.title || !newTask.userId) {
      alert("Task title and User ID are required!");
      return;
    }
    try {
      console.log("try to save task");
      const response = await API.post("/api/addTask", newTask);
      setTasks((prevTasks) => [...prevTasks, response.data.newTask]);
      setShowModal(false);
      setNewTask({
        userId: loggedInUser._id,
        title: "",
        description: "",
        status: "Pending",
      });
      console.log(loggedInUser);
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  const editTask = (task) => {
    setNewTask({
      userId: task.userId,
      title: task.title,
      description: task.description,
      status: task.status,
      _id: task._id,
    });
    setShowModal(true);
  };

  const updateTask = async () => {
    if (!newTask.title || !newTask.userId) {
      alert("Task title and User ID are required!");
      return;
    }

    try {
      console.log("try to update task");
      const response = await API.put(`/api/tasks/${newTask._id}`, newTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === newTask._id ? response.data.updatedTask : task
        )
      );
      setShowModal(false);
      setNewTask({
        userId: loggedInUser._id,
        title: "",
        description: "",
        status: "Pending",
      });
      console.log(loggedInUser);
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      console.log("try to delete task", taskId);
      await API.delete(`/api/tasks/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };
  return (
    <>
      <div className="task-container">
        <h4>Task Details</h4>
        <button onClick={() => setShowModal(true)}>Add Task</button>
      </div>

      <table className="task-table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>
                  <button onClick={() => editTask(task)} className="taskButton">
                    Edit
                  </button>{" "}
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="taskButton"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No tasks available</td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h4>{newTask._id ? "Edit Task" : "Add Task"}</h4>
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <textarea
              name="description"
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, description: e.target.value }))
              }
            />
            <select
              name="status"
              value={newTask.status}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, status: e.target.value }))
              }
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button onClick={newTask._id ? updateTask : saveTask}>
              {newTask._id ? "Update" : "Save"}
            </button>
            <button
              onClick={() => {
                setShowModal(false);
                setNewTask({
                  userId: loggedInUser._id,
                  title: "",
                  description: "",
                  status: "Pending",
                });
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewTask;
