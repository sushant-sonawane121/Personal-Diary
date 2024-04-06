import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="header-nav navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Personal Dairy
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link text-white">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/writeDairy"} className="nav-link text-white">
                Write Dairy
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/showDairy"} className="nav-link text-white">
                Show Dairy Pages
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link text-white">
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
