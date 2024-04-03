import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import '../styles/Home.css'
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate  = useNavigate();
  const user = localStorage.getItem("currentUser");
  
  return (
    <div className="container-fluid bg-dark text-light py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="text-center mb-5">
            <h1 className="diary-title">Welcome to Your Personal Diary</h1>
            <p className="lead">
              Store your thoughts, memories, and experiences securely.
            </p>
          </div>
          <div className="row justify-content-center mt-4 mb-4">
            {!user?(
              <div className="col-md-8 text-center">
              <Link to="/login" className="btn btn-primary me-3">
                Login
              </Link>
              <Link to="/register" className="btn btn-outline-light">
                Register
              </Link>
            </div>
            ):(
              <div className="col-md-8 text-center mt-4">
              <button className="btn btn-success me-3" onClick={()=>{navigate("/writeDairy")}}>Write in Diary</button>
              
            </div>
            )
            }
            
            
          </div>
          <div className="row justify-content-center align-items-stretch">
            <div className="col-md-4 mb-4">
              <div className="card bg-secondary text-light h-100">
                <div className="card-body">
                  <h3 className="card-title">Secure</h3>
                  <p className="card-text">
                    Your data is encrypted and protected.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card bg-secondary text-light h-100">
                <div className="card-body">
                  <h3 className="card-title">Easy to Use</h3>
                  <p className="card-text">
                    Intuitive interface for effortless journaling.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card bg-secondary text-light h-100">
                <div className="card-body">
                  <h3 className="card-title">Accessible Anywhere</h3>
                  <p className="card-text">
                    Access your diary from any device, anywhere.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
