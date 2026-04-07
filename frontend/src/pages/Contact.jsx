import React, { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
  };

  const container = {
    padding: "100px 20px",
    maxWidth: "600px",
    margin: "auto",
    fontFamily: "Arial"
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    width: "100%"
  };

  const buttonStyle = {
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#3AB795",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  };

  return (
    <div style={container}>
      <h1>Contact Us</h1>
      <p>If you have any questions, feel free to contact us.</p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "20px"
        }}
      >
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="email"
          placeholder="Your Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          value={form.message}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;