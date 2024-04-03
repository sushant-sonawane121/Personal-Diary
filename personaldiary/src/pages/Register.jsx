import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
  let navigate = useNavigate();
  
  const user = localStorage.getItem("currentUser");
  useEffect(()=>{
    if (user) {
      navigate("/");
    }
  })
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      const data = await response.json();
      if (response.status) {
        alert("Registration Successful");
        navigate('/login');
      }

      // console.log("User registered successfully:", data);
    } catch (error) {
      console.error("Registration error:", error.message);
    }
    setFormData({
      name: "",
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="container-fluid bg-dark text-light py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5 bg-secondary">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Registration</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="text-light">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="text-light">Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="text-light">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="text-light">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-3"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
