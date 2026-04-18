import React, { useState } from "react";
import bgImage from "../assets/background.png";
import AboutUs from "./AboutUs";
import FAQ from "./FAQ";

function Home() {
  const [address, setAddress] = useState("");
  const [deliveryType, setDeliveryType] = useState("deliver_now");

  const handleSearch = () => {
    alert(`Searching restaurants for ${address} (${deliveryType})`);
  };

  return (
    <div style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif", margin: 0, overflowX: "hidden", width: "100%" }}>

      {/* HERO SECTION */}
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          padding: "20px"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1,
          }}
        />

        <div
          style={{
            zIndex: 2,
            width: "100%",
            maxWidth: "900px",
            textAlign: "center",
          }}
        >
          <h1
            className="hero-title"
            style={{
              fontSize: "clamp(2.2rem, 8vw, 4rem)",
              marginBottom: "20px",
              fontWeight: "900",
              letterSpacing: "1px",
              fontFamily: "'Poppins', 'Segoe UI', sans-serif",
            }}
          >
            <span className="white-text">Welcome to</span>{" "}
            <span className="blue-text">Zenbaba Delivery</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 4vw, 1.5rem)",
              marginBottom: "30px",
              fontWeight: "500",
              fontFamily: "'Poppins', 'Segoe UI', sans-serif",
            }}
          >
            Order food online from the best restaurants in Bahir Dar
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            <input
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "8px",
                border: "none",
                fontSize: "1rem",
              }}
            />

            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <select
                value={deliveryType}
                onChange={(e) => setDeliveryType(e.target.value)}
                style={{
                  flex: "1",
                  padding: "14px",
                  borderRadius: "8px",
                  border: "none",
                }}
              >
                <option value="deliver_now">Deliver Now</option>
                <option value="schedule">Schedule</option>
              </select>

              <button
                onClick={handleSearch}
                style={{
                  flex: "1",
                  padding: "14px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#0077ff",
                  color: "white",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <section style={{ width: "100%", padding: "60px 0", background: "black", color: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "auto", padding: "0 20px" }}>
          <AboutUs />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ width: "100%", padding: "60px 0", background: "rgba(0, 0, 0, 0.6)", color: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "auto", padding: "0 20px" }}>
          <FAQ />
        </div>
      </section>

      {/* ================= FOOTER ================= */}
<footer
  style={{
    width: "100%",
    backgroundColor: "#0b0f14",
    color: "white",
    padding: "60px 20px 30px",
    boxSizing: "border-box",
  }}
>
  <div
    style={{
      maxWidth: "1200px",
      margin: "auto",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "30px",
    }}
  >

    {/* BRAND */}
    <div>
      <h2 style={{ color: "#0077ff", marginBottom: "10px" }}>
        Zenbaba Delivery
      </h2>
      <p style={{ color: "#bbb", fontSize: "14px", lineHeight: "1.6" }}>
        Fast, fresh food delivery from the best restaurants in Bahir Dar.
      </p>
    </div>

    {/* CONTACT */}
    <div>
      <h3 style={{ marginBottom: "12px" }}>Get in Touch</h3>
      <p style={{ color: "#bbb" }}>📧 support@zenbaba.com</p>
      <p style={{ color: "#bbb" }}>📞 +251 911 234 567</p>
      <p style={{ color: "#bbb" }}>📍 Bahir Dar, Ethiopia</p>
    </div>

    {/* SOCIAL MEDIA (REAL ICONS) */}
    <div>
      <h3 style={{ marginBottom: "12px" }}>Follow Us</h3>

      <div style={{ display: "flex", gap: "15px", fontSize: "20px" }}>
        
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#1877F2" }}
        >
          <i className="fab fa-facebook-f"></i>
        </a>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#E4405F" }}
        >
          <i className="fab fa-instagram"></i>
        </a>

        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#1DA1F2" }}
        >
          <i className="fab fa-twitter"></i>
        </a>

        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0A66C2" }}
        >
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>
    </div>

    {/* QUICK LINKS (REACT ROUTER NAVIGATION) */}
    <div>
      <h3 style={{ marginBottom: "12px" }}>Quick Links</h3>

      <p style={{ color: "#bbb" }}>
        <a href="/" style={{ color: "#bbb", textDecoration: "none" }}>
          Home
        </a>
      </p>

      <p style={{ color: "#bbb" }}>
        <a href="/menu" style={{ color: "#bbb", textDecoration: "none" }}>
          Menu
        </a>
      </p>

      <p style={{ color: "#bbb" }}>
        <a href="/restaurants" style={{ color: "#bbb", textDecoration: "none" }}>
          Restaurants
        </a>
      </p>

      <p style={{ color: "#bbb" }}>
        <a href="#about" style={{ color: "#bbb", textDecoration: "none" }}>
          About Us
        </a>
      </p>

      <p style={{ color: "#bbb" }}>
        <a href="#faq" style={{ color: "#bbb", textDecoration: "none" }}>
          FAQ
        </a>
      </p>
    </div>
  </div>

  {/* BOTTOM LINE */}
  <div
    style={{
      textAlign: "center",
      marginTop: "40px",
      borderTop: "1px solid #222",
      paddingTop: "20px",
      fontSize: "14px",
      color: "#777",
    }}
  >
    © 2026 Zenbaba Delivery — All rights reserved
  </div>
</footer>

      {/* STYLES */}
      <style>
        {`
          * {
            box-sizing: border-box;
          }

          body, html {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }

          .hero-title {
            animation: fadeUp 1s ease forwards;
          }

          .white-text { color: white; }
          .blue-text { color: #0077ff; }

          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

export default Home;