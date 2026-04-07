import React, { useState } from "react";

function Register({ onClose, onSwitchToLogin, onRegister }) { // <- add onRegister
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name: form.name, email: form.email }; // send user info back
    onRegister(userData); // <-- crucial
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(5px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "10px",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          width: "90%",
          maxWidth: "400px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            border: "none",
            background: "transparent",
            fontSize: "20px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ×
        </button>

        <h2 style={{ textAlign: "center", margin: 0 }}>Sign Up</h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              fontSize: "16px",
            }}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              fontSize: "16px",
            }}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              fontSize: "16px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#3AB795",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Sign Up
          </button>
        </form>

        <p style={{ fontSize: "14px", textAlign: "center", color: "#555" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#3AB795", cursor: "pointer" }}
            onClick={() => onSwitchToLogin()}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;