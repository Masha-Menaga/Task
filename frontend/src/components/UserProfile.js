import React, { useState, useEffect } from "react";
import API from "../api";
import "./UserProfile.css";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      console.log("fetch profile");
      const response = await API.get("/api/getProfile", {
        withCredentials: true,
      });
      setProfile(response.data);
    } catch (err) {
      setError("Failed to fetch profile details");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}

      {profile ? (
        <div className="profile-container">
          <h3>Profile Details</h3>
          <table className="profile-table">
            <tbody>
              <tr>
                <td>Username:</td>
                <td>{profile.username}</td>
              </tr>
              <tr>
                <td>Email ID:</td>
                <td>{profile.emailid}</td>
              </tr>
              <tr>
                <td>Gender:</td>
                <td>{profile.gender}</td>
              </tr>
              <tr>
                <td>Age:</td>
                <td>{profile.age}</td>
              </tr>
              <tr>
                <td>Phone:</td>
                <td>{profile.phone}</td>
              </tr>
              <tr>
                <td>Address:</td>
                <td>{profile.address}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        !error && <p>Loading profile...</p>
      )}
    </div>
  );
};

export default UserProfile;
