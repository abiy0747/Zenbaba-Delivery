import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Styles
  const navStyle = {
    display: "flex",
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 50px",
    backgroundColor: "#fcf7f6",
    color: "black",
    fontFamily: "Arial, sans-serif",
    zIndex: 1000,
  };

  const navLinks = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  };

  const loginButtonStyle = {
    padding: "8px 18px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    backgroundColor: "#3AB795", // Palm tree color
    color: "white",
  };

  const signupButtonStyle = {
    padding: "8px 18px",
    border: "1px solid #3AB795",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    backgroundColor: "transparent", // transparent
    color: "#3AB795",
  };

  const sideMenuStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "260px",
    height: "100vh",
    backgroundColor: "#fcf7f6",
    padding: "30px",
    boxShadow: "2px 0 10px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    zIndex: 2000,
    transition: "transform 0.3s ease",
    transform: menuOpen ? "translateX(0)" : "translateX(-300px)",
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100vw",
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 1500,
  };

  const linkStyle = {
    textDecoration: "none",
    color: "black",
    fontSize: "18px",
    padding: "10px 0",
  };

  // Close menu if click outside
  const handleOverlayClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav style={navStyle}>
        {/* Left side */}
        <div style={navLinks}>
          <div
            style={{ fontSize: "24px", cursor: "pointer" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </div>

          <Link to="/" style={{ color: "black", textDecoration: "none", fontWeight: "bold" }}>
            Home
          </Link>
          <Link to="/cart" style={{ color: "black", textDecoration: "none", fontWeight: "bold" }}>
            Cart
          </Link>
        </div>

        {/* Right side buttons */}
        <div style={navLinks}>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button style={loginButtonStyle}>Login</button>
          </Link>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <button style={signupButtonStyle}>Sign Up</button>
          </Link>
        </div>
      </nav>

      {/* Overlay */}
      {menuOpen && <div style={overlayStyle} onClick={handleOverlayClick}></div>}

      {/* Side Menu */}
      <div style={sideMenuStyle}>
        {/* Login/SignUp buttons inside menu */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
          <button style={loginButtonStyle}>Login</button>
          <button style={signupButtonStyle}>Sign Up</button>
        </div>

        {/* Menu links */}
        <Link to="/" style={linkStyle} onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/restaurants" style={linkStyle} onClick={() => setMenuOpen(false)}>Find Restaurants</Link>
        <Link to="/popular" style={linkStyle} onClick={() => setMenuOpen(false)}>Popular Foods</Link>
        <Link to="/offers" style={linkStyle} onClick={() => setMenuOpen(false)}>Deals & Offers</Link>
        <Link to="/track" style={linkStyle} onClick={() => setMenuOpen(false)}>Track Your Order</Link>
        <Link to="/driver" style={linkStyle} onClick={() => setMenuOpen(false)}>Become a Driver</Link>
        <Link to="/partner" style={linkStyle} onClick={() => setMenuOpen(false)}>Partner With Us</Link>
        <Link to="/help" style={linkStyle} onClick={() => setMenuOpen(false)}>Help Center</Link>
        <Link to="/contact" style={linkStyle} onClick={() => setMenuOpen(false)}>Contact</Link>
      </div>
    </>
  );
}

export default Navbar;