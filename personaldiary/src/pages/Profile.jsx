import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import { FaRegWindowClose } from "react-icons/fa";

const Profile = () => {
  let navigate = useNavigate();
  const user = localStorage.getItem("currentUser");
  const uname = localStorage.getItem("c_user_Name");
  const uemail = localStorage.getItem("c_user_Email");

  const [name, setName] = useState(uname ? uname : "");
  const [username, setUsername] = useState(user ? user : "");
  const [email, setEmail] = useState(uemail ? uemail : "");
  const [pagesCount, setPagesCount] = useState(20);
  const [deleteFormVisible, setDeleteFormVisible] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

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
    setDeleteFormVisible(true);
  };

  const handleCloseDeleteForm = () => {
    setDeleteFormVisible(false);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/deleteAcc/${user}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.status);
      if (!response.ok) {
        throw new Error("Failed to delete");
      } else {
        const responseData = await response.json(); // Parse response data if needed
        alert("Account deleted Successfully");
        localStorage.clear(); // Remove all items from localStorage
        navigate("/"); // Navigate to desired location
      }
    } catch (error) {
      console.error("Account Delete Error", error.message);
    }
  };

  return (
    <>
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
                    {pagesCount}
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
                <button
                  type="submit"
                  className="btn btn-secondary"
                  disabled={true}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

        {deleteFormVisible && (
          <div className="acc-delete-form rounded d-flex align-items-center justify-content-center">
            <FaRegWindowClose
              className="close-form"
              onClick={handleCloseDeleteForm}
            />
            <form className="delete-form border border-1 border-dark rounded bg-dark">
              <div className="form-container text-white">
                <h6 className="text-center">
                  Do You Want to Delete Your Account?
                </h6>
                <h4 className="text-center">{user}</h4>
                {/* <div className="mb-3">
                  <label htmlFor="pass" className="form-label">
                    Enter Your Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="pass"
                    name="pass"
                    required
                  />
                </div> */}
                <button
                  type="button"
                  className="btn btn-danger rounded"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
