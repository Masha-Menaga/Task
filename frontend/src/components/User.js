import React, { useContext, useState } from "react";
import "./Admin.css";
import LoginContext from "../context/LoginContext";
import MyCalendar from "./Calender";
import ViewTask from "./ViewTask";
import UserProfile from "./UserProfile";

const User = () => {
  const { user, logout } = useContext(LoginContext);
  const [active, setActive] = useState("Dashboard");
  const [dropdown, setDropdown] = useState(false);
  function handleDropdown() {
    setDropdown(!dropdown);
  }

  return (
    <>
      <div className="admin-container">
        <div className="dashboard">
          <div className="admin">
            <h4>User</h4>
            <p className="tab" onClick={() => setActive("Dashboard")}>
              <img src="../icons/dashboard.png" alt="dashboard" />
              Dashboard
            </p>
            <p className="tab" onClick={() => setActive("Profile")}>
              <img src="../icons/profile.png" alt="profile" />
              Profile
            </p>
            <p className="tab" onClick={() => setActive("Task")}>
              <img src="../icons/task.png" alt="task" />
              Task
            </p>
          </div>
          <aside>
            <div>
              <img
                src="../icons/profile_icon.png"
                alt="profile_icon"
                className="profile"
                onClick={handleDropdown}
              />
              {dropdown && (
                <div className="dropdown-menu">
                  <img
                    src="../icons/profile_icon.png"
                    alt="Profile"
                    className="profile-icon"
                  />
                  {user ? (
                    <>
                      <p>
                        <b>{user.role} : </b> {user.username}
                      </p>
                      <button className="logout-button" onClick={logout}>
                        Logout
                      </button>
                    </>
                  ) : (
                    <p>Loading user details...</p>
                  )}
                </div>
              )}

              <h1>Hello {user?.username || "Guest"}!, </h1>
              {active === "Dashboard" && (
                <>
                  <p> Have a nice day</p>
                  <MyCalendar />
                </>
              )}
              {active === "Profile" && (
                <>
                  <UserProfile />
                </>
              )}
              {active === "Task" && (
                <>
                  <ViewTask />
                </>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default User;
