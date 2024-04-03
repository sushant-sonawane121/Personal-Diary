import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import { useNavigate } from "react-router-dom";
const Login = () => {
  let navigate = useNavigate();

  const user = localStorage.getItem("currentUser");
  useEffect(()=>{
    if (user) {
      navigate("/");
    }
  })
  

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      // console.log(data);
      if (data) {
        localStorage.setItem("currentUser", data.username);
        localStorage.setItem("c_user_Name", data.name);
        localStorage.setItem("c_user_Email", data.email);
       
        navigate("/");
      }
      
      // Redirect to dashboard upon successful login
      // history.push('/dashboard');  Replace '/dashboard' with the route you want to redirect to
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <div className="container-fluid bg-dark text-light py-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card bg-secondary text-light">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    User Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Login
                  </button>
                </div>
              </form>
              <div className="mt-3 text-center">
                <p>
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
