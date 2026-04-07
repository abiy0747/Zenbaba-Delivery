// src/pages/HelpCenter.js
import React from "react";
import { FaPhone, FaEnvelope, FaTelegram } from "react-icons/fa";

function HelpCenter() {
  const container = {
    padding: "100px 20px",
    maxWidth: "900px",
    margin: "auto",
    fontFamily: "Arial",
  };

  const card = {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  };

  const title = {
    color: "#3AB795",
    marginBottom: "10px",
  };

  const supportCard = {
    border: "1px solid #3AB795",
    borderRadius: "10px",
    padding: "20px",
    marginTop: "30px",
    backgroundColor: "#f0fdfb",
  };

  const supportItem = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "16px",
    marginBottom: "10px",
  };

  return (
    <div style={container}>
      <h1>Help Center</h1>
      <p>Find answers to common questions about Zenbaba Delivery.</p>

      <div style={card}>
        <h3 style={title}>How do I place an order?</h3>
        <p>
          Browse restaurants, choose your favorite food from the menu,
          add items to your cart, and proceed to checkout.
        </p>
      </div>

      <div style={card}>
        <h3 style={title}>How can I track my order?</h3>
        <p>
          After placing an order, go to the "Track Order" section
          to see the delivery status in real time.
        </p>
      </div>

      <div style={card}>
        <h3 style={title}>What payment methods are accepted?</h3>
        <p>
          Zenbaba Delivery supports cash on delivery and online payments.
        </p>
      </div>

      <div style={card}>
        <h3 style={title}>How do I become a delivery driver?</h3>
        <p>
          You can apply in the "Become a Driver" section in the menu.
        </p>
      </div>

      {/* Support Section */}
      <div style={supportCard}>
        <h2 style={{ color: "#3AB795", marginBottom: "15px" }}>Contact Support</h2>
        <div style={supportItem}>
          <FaPhone color="#3AB795" /> <span>+251 912 345 678</span>
        </div>
        <div style={supportItem}>
          <FaEnvelope color="#3AB795" /> <span>support@zenbaba.com</span>
        </div>
        <div style={supportItem}>
          <FaTelegram color="#3AB795" /> <span>@ZenbabaSupport</span>
        </div>
      </div>
    </div>
  );
}

export default HelpCenter;