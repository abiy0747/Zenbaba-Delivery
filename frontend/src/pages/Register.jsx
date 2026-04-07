import React, { useState } from "react";

function Register({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Registered ${form.name}`);
    onClose(); // close modal after register
  };

  return (
    <>
      {/* Full screen overlay */}
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
          zIndex: 2000,
        }}
        onClick={onClose} // close if clicked outside
      >
        {/* Centered form */}
        <div
          onClick={e => e.stopPropagation()} // prevent closing when clicking inside
          style={{
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
          <h1 style={{ textAlign: "center" }}>Sign Up</h1>
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
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
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
              }}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;