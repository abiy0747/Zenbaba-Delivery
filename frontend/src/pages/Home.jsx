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
          boxSizing: "border-box", // Prevents overflow
          padding: "20px"
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div
          style={{
            zIndex: 2,
            width: "100%", // Changed to 100% for mobile
            maxWidth: "900px",
            textAlign: "center",
          }}
        >
          {/* 🔥 BOLD + NEW FONT TITLE */}
          <h1
            className="hero-title"
            style={{
              fontSize: "clamp(2.2rem, 8vw, 4rem)", // Slightly smaller mobile font
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

          {/* Search Box Container */}
          <div
            style={{
              display: "flex",
              flexDirection: "column", // Stack vertically on mobile
              gap: "10px",
              width: "100%",
              maxWidth: "500px", // Better for mobile reach
              margin: "0 auto",
            }}
            className="search-container"
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
                fontFamily: "'Poppins', sans-serif",
                boxSizing: "border-box"
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
                  fontSize: "1rem",
                  fontFamily: "'Poppins', sans-serif",
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
                  fontSize: "1rem",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <section
        style={{
          width: "100%",
          padding: "60px 0",
          margin: 0,
          background: "black",
          color: "white",
          boxSizing: "border-box"
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
            padding: "0 20px",
            boxSizing: "border-box"
          }}
        >
          <AboutUs />
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        style={{
          width: "100%",
          padding: "60px 0",
          margin: 0,
          background: "rgba(0, 0, 0, 0.6)",
          color: "white",
          boxSizing: "border-box"
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
            padding: "0 20px",
            boxSizing: "border-box"
          }}
        >
          <FAQ />
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          width: "100%",
          backgroundColor: "#111",
          color: "white",
          padding: "40px 20px",
          margin: 0,
          fontFamily: "'Poppins', sans-serif",
          boxSizing: "border-box"
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "20px",
          }}
        >
          <div>
            <h3 style={{ fontWeight: "700" }}>Zenbaba Delivery</h3>
            <p style={{ color: "#bbb", fontSize: "14px" }}>
              Order food online from the best restaurants in Bahir Dar.
            </p>
          </div>
          <div>
            <h4>Get to Know Us</h4>
            <p>About Us</p><p>Careers</p><p>Investors</p><p>Blog</p>
          </div>
          <div>
            <h4>Help</h4>
            <p>Account</p><p>Orders</p><p>Help Center</p>
          </div>
          <div>
            <h4>Partner</h4>
            <p>Add Restaurant</p><p>Become Driver</p><p>Business Delivery</p>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "20px", borderTop: "1px solid #333", paddingTop: "15px", fontSize: "14px", color: "#aaa" }}>
          © 2026 Zenbaba Delivery
        </div>
      </footer>

      {/* STYLES */}
      <style>
        {`
          * {
            box-sizing: border-box; /* CRITICAL: Fixes the side gap */
          }
          
          body, html {
            margin: 0;
            padding: 0;
            overflow-x: hidden; /* Prevents horizontal scrolling */
            width: 100%;
          }

          .hero-title {
            animation: fadeUp 1s ease forwards;
          }

          .white-text { color: white; }
          .blue-text { color: #0077ff; }

          @media (min-width: 600px) {
            .search-container {
              flex-direction: row !important;
              max-width: 900px !important;
            }
          }

          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(40px);
              filter: blur(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
              filter: blur(0);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Home;