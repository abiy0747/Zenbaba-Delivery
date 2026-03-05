import React, { useState } from "react";
import bgImage from "../assets/background.png"; // Make sure this image exists

function Home() {
  const [address, setAddress] = useState("");
  const [deliveryType, setDeliveryType] = useState("deliver_now");

  // Sample customer reviews
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

  const handleSearch = () => {
    alert(`Searching restaurants for ${address} (${deliveryType})`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        fontFamily: "Arial, sans-serif",
        color: "white",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      ></div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "100px", // space for fixed navbar
          width: "90%",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Heading */}
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Welcome to Zenbaba Delivery
        </h1>

        <p
          style={{
            fontSize: "1.3rem",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Order food online from the best restaurants in Bahir Dar
        </p>

        {/* Search Section */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
            width: "100%",
            maxWidth: "900px",
          }}
        >
          <input
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{
              flex: "2",
              minWidth: "200px",
              padding: "15px",
              borderRadius: "10px",
              border: "none",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              fontSize: "1rem",
            }}
          />

          <select
            value={deliveryType}
            onChange={(e) => setDeliveryType(e.target.value)}
            style={{
              flex: "1",
              minWidth: "150px",
              padding: "15px",
              borderRadius: "10px",
              border: "none",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              fontSize: "1rem",
            }}
          >
            <option value="deliver_now">Deliver Now</option>
            <option value="schedule">Schedule</option>
          </select>

          <button
            onClick={handleSearch}
            style={{
              flex: "1",
              minWidth: "120px",
              padding: "15px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#3AB795", // Palm tree color
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "1rem",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            }}
          >
            Search Here
          </button>
        </div>

        {/* Customer Reviews */}
        <div
          style={{
            marginTop: "60px",
            width: "100%",
            maxWidth: "1000px",
          }}
        >
          <h2 style={{ marginBottom: "30px", fontSize: "2rem", textAlign: "center" }}>
            What Our Customers Say
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  padding: "20px",
                  borderRadius: "10px",
                  backdropFilter: "blur(5px)",
                  textAlign: "center",
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

      {/* Footer */}
      <footer
        style={{
          width: "100%",
          backgroundColor: "#111",
          color: "white",
          padding: "50px 20px",
          marginTop: "auto",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "30px",
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
            <h4>Popular Foods</h4>
            <p>Burger</p>
            <p>pizza</p>
            <p>Borito</p>
            <p>Ertib</p>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "40px",
            borderTop: "1px solid #333",
            paddingTop: "20px",
            fontSize: "14px",
            color: "#aaa",
          }}
        >
          © 2026 Zenbaba Delivery. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;