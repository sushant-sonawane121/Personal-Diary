import React, { useState,useEffect } from "react";
import { json, useNavigate } from "react-router-dom";


const Profile = () => {
  let navigate = useNavigate();
  const user = localStorage.getItem("currentUser");
 const uname =  localStorage.getItem("c_user_Name");
 const uemail =  localStorage.getItem("c_user_Email");

  
 

  const [name, setName] = useState(uname?uname:"");
  const [username, setUsername] = useState(user?user:"");
  const [email, setEmail] = useState(uemail?uemail:"");
  const [pagesCount, setPagesCount] = useState(20);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    // setName(userDetails.name);
    // setUsername(userDetails.username);
    // setEmail(userdetails.email);
  });

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePagesCountChange = (e) => {
    setPagesCount(e.target.value);
  };

  const handleDeleteAccount = () => {
    // Your delete account logic goes here
    alert("Account deleted successfully!");
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card bg-dark text-white w-75">
        <div className="card-body">
          <h5 className="card-title">User Profile</h5>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group">
              <label>Diary Pages Count</label>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-dark border-secondary text-white border border-1 rounded">
                  20
                </li>
              </ul>
            </div>
            <div className="mt-3 d-flex gap-3">
              <button
                type="button"
                className="btn btn-danger mr-2"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
              <button type="submit" className="btn btn-secondary" disabled={true}>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
