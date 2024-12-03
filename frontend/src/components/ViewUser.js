import React, { useEffect, useState, useMemo } from "react";
import "./ViewTask.css";
import API from "../api";

const ViewUser = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const loggedInUser = useMemo(() => {
    return JSON.parse(localStorage.getItem("loggedInUser")) || {};
  }, []);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchUsers = async () => {
    setError("");
    try {
      const response = await API.get("/api/allUsers");
      setUsers(response.data.users);
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    }
  };

  useEffect(() => {
    if (loggedInUser?.role === "admin") {
      fetchUsers();
    }
  }, [loggedInUser]);

  const fetchTasks = async (userId) => {
    try {
      const response = await API.get(`/api/tasks?userId=${userId}`);
      setTasks(response.data.tasks);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  const handleViewTasks = (userId) => {
    setSelectedUserId(userId);
    fetchTasks(userId);
  };
  const handleDeleteUser = async (userId) => {
    try {
      await API.delete(`/api/deleteUser/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };
  return (
    <div>
      <div className="userview-container">
        <h3>All Users</h3>
        {error && <p>{error}</p>}
        <table className="viewuser-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users
                .filter((user) => user.role === "user")
                .map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.emailid}</td>
                    <td>{user.role}</td>
                    <td>
                      <div className="button-container">
                        <button
                          onClick={() => handleViewTasks(user._id)}
                          className="viewTask"
                        >
                          View Tasks
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="viewTask"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="4">No users available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedUserId && (
        <div className="userview-container">
          <h3>Tasks for User - User id: {selectedUserId}</h3>
          <table className="viewuser-table">
            <thead>
              <tr>
                <th>Task Title</th>
                <th>Task description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <tr key={task._id}>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No tasks available for this user</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewUser;
