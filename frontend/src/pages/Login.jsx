import React, { useState, useEffect } from "react";
import "../Css/login.css";



function Login({ onClose, onSwitchToRegister, onLogin }) {
  const initialState = {
    email: "",
    password: "",
    phone: "",
    address: ""
  };

  const [form, setForm] = useState(initialState);

  const resetForm = () => setForm(initialState);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ BACKEND LOGIN FUNCTION
  const loginUser = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  // ✅ UPDATED HANDLE SUBMIT (REAL LOGIN)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await loginUser(form.email, form.password);

    if (data && data.token) {
      onLogin({
        name: data.user.name,
        email: data.user.email,
        phone: form.phone,
        address: form.address,
        token: data.token
      });

      // store token locally
      localStorage.setItem("token", data.token);

      resetForm();
      onClose();
    } else {
      alert(data.message || "Login failed");
    }
  };

  // reset form when opened
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

          <input
            className="login-input"
            name="phone"
            type="text"
            placeholder="Phone Number"
            value={form.phone || ""}
            onChange={handleChange}
            autoComplete="off"
            required
          />

          <input
            className="login-input"
            name="address"
            type="text"
            placeholder="Address"
            value={form.address || ""}
            onChange={handleChange}
            autoComplete="off"
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
              email: "googleuser@gmail.com"
            });

            resetForm();
            onClose();
          }}
        >
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