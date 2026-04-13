import React, { useState, useEffect } from "react";
import "../Css/login.css";

function Login({ onClose, onSwitchToRegister, onLogin }) {
  const initialState = { email: "", password: "" };
  const [form, setForm] = useState(initialState);

  const resetForm = () => setForm(initialState);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin({
      name: "Demo User",
      email: form.email,
    });

    resetForm();
    onClose();
  };

  // ✅ FIX 1: reset every time modal is opened/used
  useEffect(() => {
    resetForm();
  }, []);

  return (
    <div
      className="login-overlay"
      onClick={() => {
        resetForm();
        onClose();
      }}
    >
      <div className="login-box" onClick={(e) => e.stopPropagation()}>
        <button
          className="close-btn"
          onClick={() => {
            resetForm();
            onClose();
          }}
        >
          ✕
        </button>

        <h2 className="login-title">Welcome Back</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="login-input"
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            autoComplete="off"
            required
          />

          <input
            className="login-input"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        {/* OR */}
        <div className="divider">
          <span>OR</span>
        </div>

        {/* GOOGLE */}
        <button
          className="google-btn"
          onClick={() => {
            onLogin({
              name: "Google User",
              email: "googleuser@gmail.com",
            });

            resetForm();
            onClose();
          }}
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.7 1.2 9.2 3.6l6.9-6.9C35.9 2.2 30.4 0 24 0 14.6 0 6.4 5.5 2.4 13.5l8 6.2C12.2 13.2 17.7 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-2.8-.4-4H24v8h12.7c-.6 3-2.3 5.5-4.9 7.2l7.6 5.9c4.4-4.1 6.7-10.1 6.7-17.1z"/>
            <path fill="#FBBC05" d="M10.4 28.7c-1-3-1-6.4 0-9.4l-8-6.2C-1.1 18.5-1.1 29.5 2.4 35.5l8-6.8z"/>
            <path fill="#34A853" d="M24 48c6.4 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.8 2.2-8.3 2.2-6.3 0-11.8-3.7-13.6-9.1l-8 6.2C6.4 42.5 14.6 48 24 48z"/>
          </svg>

          Continue with Google
        </button>

        <p className="login-footer">
          Don't have an account?{" "}
          <span
            className="login-link"
            onClick={() => {
              resetForm();
              onSwitchToRegister();
            }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;