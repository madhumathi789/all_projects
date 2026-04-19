import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import "./login.css";

const isPasswordValid = (password) => {
  return (
    password.length >= 4 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[@$!%*?&]/.test(password)
  );
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!isPasswordValid(password)) {
      setError(
        "Password must be at least 4 characters and include uppercase, lowercase, number, and special character"
      );
      return;
    }

    try {
      const response = await API.post("/auth/register", {
        username: name,
        email,
        password,
      });
      if (response.status === 201) {
        navigate("/"); // redirect to login after registration
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again!");
    }
  };

  return (
    <div className="login-container">
      {/* LEFT IMAGE */}
      <div className="left-section">
        <img
          src="/Frame_228.png"
          alt="Register Illustration"
          className="illustration"
          style={{ marginLeft: "20px" }} // slightly move image right
        />
      </div>

      {/* RIGHT FORM */}
      <div className="right-section">
        <div className="form-container">
          <h2 className="form-title">Register</h2>
          <form onSubmit={handleRegister}>
            {/* Name */}
            <div className="input-group">
              <label htmlFor="register-name">Name</label>
              <input
                id="register-name"
                name="name"
                type="text"
                placeholder="Enter your name"
                className="input-box"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>

            {/* Email */}
            <div className="input-group">
              <label htmlFor="register-email">Email</label>
              <input
                id="register-email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="input-box"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div className="input-group">
              <label htmlFor="register-password">Password</label>
              <input
                id="register-password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="input-box"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <p style={{ fontSize: "0.8rem", color: "#ddd" }}>
                Password must contain uppercase, lowercase, number, special
                character (min 4)
              </p>
            </div>

            {/* Error */}
            {error && <p className="error-text">{error}</p>}

            {/* Register Button */}
            <button className="login-btn" type="submit">
              Register
            </button>

            {/* Login Link */}
            <p className="register-text">
              Already have an account?{" "}
              <Link to="/" className="register-link">
                Login now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;