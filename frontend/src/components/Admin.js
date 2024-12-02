import React, { useContext, useState } from "react";
import "./Admin.css";
import LoginContext from "../context/LoginContext";
import MyCalendar from "./Calender";

import UserProfile from "./UserProfile";
import ViewUser from "./ViewUser";

const Admin = ({ children }) => {
  const { user, logout } = useContext(LoginContext);
  const [active, setActive] = useState("Dashboard");
  const [dropdown, setDropdown] = useState(false);
  function handleDropdown() {
    setDropdown(!dropdown);
  }

  return (
    <div className="admin-container">
      <div className="dashboard">
        <div className="admin">
          <h4>Admin</h4>
          <p
            className="tab"
            onClick={() => {
              setActive("Dashboard");
            }}
          >
            <img src="../icons/dashboard.png" alt="dashboard" />
            Dashboard
          </p>
          <p
            className="tab"
            onClick={() => {
              setActive("Profile");
            }}
          >
            <img src="../icons/profile.png" alt="profile" />
            Profile
          </p>

          <p
            className="tab"
            onClick={() => {
              setActive("All Users");
            }}
          >
            <img src="../icons/allusers.png" alt="allusers" />
            All Users
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
            <h1>Hello {user.username}, </h1>
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
            {active === "All Users" && (
              <>
                <ViewUser />
              </>
            )}
          </div>

          {dropdown && (
            <div className="dropdown-menu">
              <img
                src="../icons/profile_icon.png"
                alt="Profile"
                className="profile-icon"
              />
              <p>
                <b>{user.role} : </b>
                {user.username}
              </p>
              <button className="logout-button" onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default Admin;
