import React, { useState, useEffect } from "react";
import "../Css/register.css";

function Register({ onClose, onSwitchToLogin, onRegister }) {
  const initialState = {
    name: "",
    email: "",
    password: "",
    phone: "",
    address: ""
  };

  const [form, setForm] = useState(initialState);

  const resetForm = () => setForm(initialState);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ BACKEND REGISTER API
  const registerUser = async (name, email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Register error:", error);
    }
  };

  // ✅ UPDATED HANDLE SUBMIT (REAL BACKEND)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await registerUser(
      form.name,
      form.email,
      form.password
    );

    if (data && data.message) {
      onRegister({
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address
      });

      resetForm();
      onClose();
    } else {
      alert(data.message || "Register failed");
    }
  };

  // reset when opened
  useEffect(() => {
    resetForm();
  }, [onClose, onSwitchToLogin]);

  useEffect(() => {
    resetForm();
  }, []);

  return (
    <div
      className="register-overlay"
      onClick={() => {
        resetForm();
        onClose();
      }}
    >
      <div className="register-box" onClick={(e) => e.stopPropagation()}>
        <button
          className="close-btn"
          onClick={() => {
            resetForm();
            onClose();
          }}
        >
          ✕
        </button>

        <h2 className="register-title">Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="register-input"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            className="register-input"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className="register-input"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            className="register-input"
            name="phone"
            type="text"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            className="register-input"
            name="address"
            type="text"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
          />

          <button className="register-btn" type="submit">
            Sign Up
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
            onRegister({
              name: "Google User",
              email: "googleuser@gmail.com"
            });

            resetForm();
            onClose();
          }}
        >
          Continue with Google
        </button>

        <p className="register-footer">
          Already have an account?{" "}
          <span
            className="register-link"
            onClick={() => {
              resetForm();
              onSwitchToLogin();
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;