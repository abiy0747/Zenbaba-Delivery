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

  return (
    <div
      style={{
        padding: "100px 20px",
        maxWidth: "600px",
        margin: "auto",
        backgroundColor: "#1a2a2f", // 🔥 dark background
        color: "white",            // 🔥 text visible
        borderRadius: "10px",
        minHeight: "100vh"
      }}
    >
      <h1 style={{ textAlign: "center" }}>Contact Us 📩</h1>

      <p style={{ textAlign: "center", opacity: 0.8 }}>
        If you have any questions, feel free to contact us.
      </p>

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
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #333",
            backgroundColor: "#243b44",
            color: "white"
          }}
        />

        <input
          name="email"
          placeholder="Your Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #333",
            backgroundColor: "#243b44",
            color: "white"
          }}
        />

        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          value={form.message}
          onChange={handleChange}
          required
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #333",
            backgroundColor: "#243b44",
            color: "white"
          }}
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#3AB795",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;