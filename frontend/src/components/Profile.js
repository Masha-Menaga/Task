import React, { useContext, useState } from "react";
import LoginContext from "../context/LoginContext";

const Profile = ({ navigate }) => {
  const { close, submit } = useContext(LoginContext);
  const [profileData, setProfileData] = useState({
    username: "",
    gender: "",
    age: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = () => {
    submit(profileData);
  };

  return (
    <>
      <div className="container">
        <p className="close" onClick={close}>
          &#10006;
        </p>

        <p>User Name:</p>
        <input
          type="text"
          name="username"
          value={profileData.username}
          onChange={handleChange}
          placeholder="Enter your UserName"
        ></input>
        <p>Gender :</p>
        <input
          type="text"
          name="gender"
          value={profileData.gender}
          onChange={handleChange}
          placeholder="Male/Female"
        ></input>
        <p>Age :</p>
        <input
          type="Number"
          name="age"
          value={profileData.age}
          onChange={handleChange}
          placeholder="Enter your age"
          min="18"
          max="120"
        ></input>
        <p>Phone Number :</p>
        <input
          type="tel"
          pattern="[0-9]{10}"
          name="phone"
          value={profileData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
        ></input>
        <p>Address :</p>
        <input
          type="text"
          name="address"
          value={profileData.address}
          onChange={handleChange}
          placeholder="Enter your detailed address"
        />
        <button onClick={handleSubmit}>submit</button>
      </div>
    </>
  );
};

export default Profile;
