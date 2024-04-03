import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css"; // Import your CSS file for Sidebar styles
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("currentUser");

  function handleLogout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userDetails");
    navigate("/");
    window.location.reload();
  }

  return (
    <header>
      <nav className="navbar navbar-dark bg-dark sidebar-navbar d-flex flex-column">
        <div className="sidebar-header">
          <h5 className="text-white">Welcome Back!</h5>
          <h4 className="text-white">{user}</h4>
        </div>
        <div className="sidebar w-100">
          {user ? (
            <ul className="list-unstyled components side-header-ul ms-4">
              <li className="nav-item">
                <Link to={"/"} className="nav-link text-white">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/showDairy"} className="nav-link text-white">
                  Show Dairy Pages
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/writeDairy"} className="nav-link text-white">
                  Write Dairy
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link text-white">
                  Profile
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="list-unstyled components side-header-ul ms-4">
              <li className="nav-item">
                <Link to={"/"} className="nav-link text-white">
                  Home
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
      <div className="fixed-bottom">
        <ul className="list-unstyled logout ">
          <li>
            {user ? (
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <p></p>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Sidebar;
