import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {
  // Initialize state to store form data
  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8083/api/v1/user/register", {
        UserName,
        Email,
        Password,
      });
      
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);  // The message from the server will be helpful here.
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        toast.error("This email or username is already taken. Please try another.");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    }
  };
  
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="col-md-6 col-lg-4">
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-white">
          {/* Full Name Field */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              UserName
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FaUser />
              </span>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter your username"
                value={UserName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FaEnvelope />
              </span>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FaLock />
              </span>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

         {/* Submit Button */}
         <button
            type="submit"
            className="btn btn-primary w-100"
           
          >
          Register
          </button>

          {/* Register Link */}
          <div className="mt-3 text-center">
            <Link to="/login">
              <h6>If You have account Please Login Here</h6>
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
