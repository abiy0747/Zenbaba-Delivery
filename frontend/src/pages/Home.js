import React, { useState } from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/background.png";

function Home() {
  const [address, setAddress] = useState("");
  const [deliveryType, setDeliveryType] = useState("deliver_now");

 const homeStyle = {
  minHeight: "250vh",
  width: "100%",
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  flexDirection: "column",
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

  const contentStyle = {
  flex: 1,                 // takes remaining space
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  zIndex: 2,
  width: "90%",
  maxWidth: "1200px",      // wider content
  margin: "0 auto",
  padding: "40px 20px",
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
    backgroundColor: "#0f0e0e",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1rem",
  };

  const handleSearch = () => {
    alert(`Searching restaurants for ${address} (${deliveryType})`);
  };


  const reviews = [
  {
    name: "Abel T.",
    comment: "Very fast delivery and the food arrived hot. Best service in Bahir Dar!",
    rating: 5
  },
  {
    name: "Sara M.",
    comment: "Easy to order and great restaurant choices. Highly recommended.",
    rating: 4
  },
  {
    name: "Dawit K.",
    comment: "Zenbaba made food ordering very simple. I love the service.",
    rating: 5
  }
];
  return (
    <div style={homeStyle}>
      <div style={overlayStyle}></div>

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

        {/* Reviews Section */}

<div
  style={{
    marginTop: "60px",
    width: "100%",
    maxWidth: "1000px"
  }}
>
  <h2 style={{ marginBottom: "30px", fontSize: "2rem" }}>
    What Our Customers Say
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px"
    }}
  >
    {reviews.map((review, index) => (
      <div
        key={index}
        style={{
          background: "rgba(255,255,255,0.1)",
          padding: "20px",
          borderRadius: "10px",
          backdropFilter: "blur(5px)"
        }}
      >
        <p style={{ fontStyle: "italic", marginBottom: "10px" }}>
          "{review.comment}"
        </p>

        <strong>{review.name}</strong>

        <div style={{ color: "#FFD700", marginTop: "5px" }}>
          {"★".repeat(review.rating)}
        </div>
      </div>
    ))}
  </div>
</div>
      </div>

      <footer
  style={{
    width: "100%",
    backgroundColor: "#111",
    color: "white",
    padding: "50px 20px",
    marginTop: "auto"
  }}
>
  <div
    style={{
      maxWidth: "1200px",
      margin: "auto",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "30px"
    }}
  >

    {/* Company */}
    <div>
      <h3>Zenbaba Delivery</h3>
      <p style={{ color: "#bbb", fontSize: "14px" }}>
        Order food online from the best restaurants in Bahir Dar.
      </p>
    </div>

    {/* Get to Know Us */}
    <div>
      <h4>Get to Know Us</h4>
      <p>About Us</p>
      <p>Careers</p>
      <p>Investors</p>
      <p>Blog</p>
    </div>

    {/* Let Us Help You */}
    <div>
      <h4>Let Us Help You</h4>
      <p>Account Details</p>
      <p>Order History</p>
      <p>Help Center</p>
      <p>Support</p>
    </div>

    {/* Partner */}
    <div>
      <h4>Partner With Us</h4>
      <p>Add Your Restaurant</p>
      <p>Become a Driver</p>
      <p>Business Delivery</p>
    </div>

    {/* Cities */}
    <div>
      <h4>Popular Cities</h4>
      <p>Bahir Dar</p>
      <p>Addis Ababa</p>
      <p>Gondar</p>
      <p>Hawassa</p>
    </div>

  </div>

  {/* Bottom Copyright */}
  <div
    style={{
      textAlign: "center",
      marginTop: "40px",
      borderTop: "1px solid #333",
      paddingTop: "20px",
      fontSize: "14px",
      color: "#aaa"
    }}
  >
    © 2026 Zenbaba Delivery. All rights reserved.
  </div>
</footer>
    </div>
  );
}

export default Home;