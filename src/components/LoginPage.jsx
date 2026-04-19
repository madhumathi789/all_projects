import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import API from "../api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      const response = await API.post("/auth/login", { email, password });
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/landing");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password!");
    }
  };

  return (
    <div className="login-container">
      {/* LEFT IMAGE SECTION */}
      <div className="left-section">
        <img
          src="/Frame_227.png"
          alt="Login Illustration"
          className="illustration"
        />
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="right-section">
        <div className="form-container">
          <h2 className="form-title">Login</h2>
          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="input-group">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
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

            {/* Password Field */}
            <div className="input-group">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="input-box"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            {/* Forgot Password */}
            <div className="forgot-link">
              <button
                type="button"
                className="forgot-btn"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </button>
            </div>

            {/* Error */}
            {error && <p className="error-text">{error}</p>}

            {/* Login Button */}
            <button className="login-btn" type="submit">
              Login
            </button>

            {/* Register Link */}
            <p className="register-text">
              Don’t have an account?{" "}
              <Link to="/register" className="register-link">
                Register now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;