import React, { useState, useEffect } from "react";

function Login({ onClose, onSwitchToRegister, onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm({ email: "", password: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name: "Demo User",
      email: form.email,
    };

    onLogin(userData);

    resetForm(); // ✅ clear inputs after login
    onClose();
  };

  // ✅ reset every time component opens
  useEffect(() => {
    resetForm();
  }, []);

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
      onClick={() => {
        resetForm(); // ✅ clear when closing
        onClose();
      }}
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
          onClick={() => {
            resetForm(); // ✅ clear when clicking X
            onClose();
          }}
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

        <h2 style={{ textAlign: "center", margin: 0 }}>Login</h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            autoComplete="off" // ✅ prevent browser autofill
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
            autoComplete="new-password" // ✅ prevent autofill
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
            Login
          </button>
        </form>

        <p style={{ fontSize: "14px", textAlign: "center", color: "#555" }}>
          Don't have an account?{" "}
          <span
            style={{ color: "#3AB795", cursor: "pointer" }}
            onClick={() => {
              resetForm(); // ✅ clear before switching
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