import React, { useState } from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/background.png"; // make sure image exists

function Home() {
  const [address, setAddress] = useState("");
  const [deliveryType, setDeliveryType] = useState("deliver_now");

  const homeStyle = {
    height: "100vh",
    width: "100%",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    color: "white",
    fontFamily: "Arial, sans-serif",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };

  const navStyle = {
    display: "flex",
    justifyContent: "flex-end",
    padding: "20px 50px",
    position: "relative",
    zIndex: 2,
  };

  const contentStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    zIndex: 2,
    width: "80%",
    maxWidth: "800px",
  };

  const searchContainerStyle = {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
  };

  const inputStyle = {
    padding: "12px 15px",
    borderRadius: "8px",
    border: "none",
    flex: "2",
    minWidth: "200px",
    fontSize: "1rem",
  };

  const selectStyle = {
    padding: "12px 15px",
    borderRadius: "8px",
    border: "none",
    fontSize: "1rem",
    minWidth: "150px",
  };

  const searchButtonStyle = {
    padding: "12px 25px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#FF6B6B",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1rem",
  };

  const handleSearch = () => {
    alert(`Searching restaurants for ${address} (${deliveryType})`);
  };

  return (
    <div style={homeStyle}>
      <div style={overlayStyle}></div>

      {/* Navbar (empty now) */}
      <div style={navStyle}></div>

      {/* Centered Content */}
      <div style={contentStyle}>
        <h1 style={{ fontSize: "3.5rem", marginBottom: "20px", fontWeight: "bold" }}>
          Welcome to Zenbaba Delivery
        </h1>
        <p style={{ fontSize: "1.3rem", marginBottom: "20px" }}>
          Order food online from the best restaurants in Bahir Dar
        </p>

        {/* Search Section */}
        <div style={searchContainerStyle}>
          <input
            type="text"
            placeholder="Enter your address"
            style={inputStyle}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <select
            style={selectStyle}
            value={deliveryType}
            onChange={(e) => setDeliveryType(e.target.value)}
          >
            <option value="deliver_now">Deliver Now</option>
            <option value="schedule">Schedule</option>
          </select>

          <button style={searchButtonStyle} onClick={handleSearch}>
            Search Here
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;