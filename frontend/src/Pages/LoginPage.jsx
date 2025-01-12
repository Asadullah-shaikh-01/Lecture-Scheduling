import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  // Initialize state to store form data
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Add the loading state
  const navigate = useNavigate();

  // Validate the form fields
  const validateForm = () => {
    return Email !== "" && Password !== "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when form is submitted

    try {
      const res = await axios.post("http://localhost:8083/api/v1/user/login", {
        Email,
        Password,
      });
      console.log(res); // Log the entire response to inspect it
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/dashboard"); // Redirect to home after successful login
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      setLoading(false); // Stop loading after error
      console.error(error); // Log the error to inspect it
      if (error.response) {
        // If response is available, log the response details
        console.error("Error response:", error.response.data);
        toast.error(error.response.data.message || "Something went wrong.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="col-md-6 col-lg-4">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-white">
          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">
              Email
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FaEnvelope />
              </span>
              <input
                type="Email"
                className="form-control"
                id="Email"
                placeholder="Enter your Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="Password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FaLock />
              </span>
              <input
                type="Password"
                className="form-control"
                id="Password"
                placeholder="Enter your Password"
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
            disabled={loading} // Disable button while loading
          >
            {loading ? "Loading..." : "Login"}{" "}
            {/* Show "Loading..." when loading */}
          </button>

          {/* Register Link */}
          <div className="mt-3 text-center">
            <Link to="/register">
              <h6>New User? Register Here</h6>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
