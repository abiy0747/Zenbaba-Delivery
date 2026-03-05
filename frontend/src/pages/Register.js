import React, { useState } from "react";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Registered ${form.name}`);
  };

  return (
    <div style={{ padding: "100px 20px", maxWidth: "400px", margin: "auto" }}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}/>
        <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}/>
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} required style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}/>
        <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#3AB795", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Register;