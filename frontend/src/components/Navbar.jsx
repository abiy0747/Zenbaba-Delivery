
// src/components/Navbar.js
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { FaHome, FaUtensils, FaShoppingCart, FaCreditCard, FaQuestionCircle, FaEnvelope } from "react-icons/fa";
import palmLogo from "../assets/palm.png";
import { ShoppingCartContext } from "../context/ShoppingCartContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const { cartItems } = useContext(ShoppingCartContext);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".navbar-menu") && !e.target.closest(".hamburger-icon")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const navStyle = {
    display: "flex",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "space-between",
    alignItems: "center",
    padding: "clamp(6px,1vw,15px) clamp(10px,2vw,50px)",
    backgroundColor: "#fcf7f6",
    color: "black",
    fontFamily: "Arial, sans-serif",
    zIndex: 1000,
    whiteSpace: "nowrap"
  };

  const navLinks = {
    display: "flex",
    alignItems: "center",
    gap: "clamp(6px,1.5vw,20px)",
    fontSize: "clamp(11px,1.2vw,16px)"
  };

  const loginButtonStyle = {
    padding: "clamp(3px,0.5vw,8px) clamp(8px,1vw,18px)",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    backgroundColor: "#3AB795",
    color: "white",
    fontSize: "clamp(10px,1vw,14px)"
  };

  const signupButtonStyle = {
    padding: "clamp(3px,0.5vw,8px) clamp(8px,1vw,18px)",
    border: "1px solid #3AB795",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    backgroundColor: "transparent",
    color: "#3AB795",
    fontSize: "clamp(10px,1vw,14px)"
  };

  const sideMenuStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "260px",
    height: "100vh",
    backgroundColor: "#fcf7f6",
    padding: "30px",
    boxShadow: menuOpen ? "2px 0 10px rgba(0,0,0,0.2)" : "none",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    zIndex: 2000,
    transition: "transform 0.3s ease",
    transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
    overflowY: "auto"
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100vw",
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 1500
  };

  const linkStyle = {
    textDecoration: "none",
    color: "black",
    fontSize: "clamp(12px,1.2vw,18px)",
    padding: "10px 0",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  };

  return (
    <>
      <nav style={navStyle}>
        <div style={navLinks}>
          <div
            className="hamburger-icon"
            style={{ fontSize: "clamp(16px,1.5vw,24px)", cursor: "pointer" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </div>

          <Link to="/" style={{ color: "black", textDecoration: "none", fontWeight: "bold" }}>
            Home
          </Link>

          <Link to="/menu" style={{ color: "black", textDecoration: "none", fontWeight: "bold" }}>
            Menu
          </Link>

          <Link to="/restaurants" style={{ color: "black", textDecoration: "none", fontWeight: "bold" }}>
            Restaurants
          </Link>
        </div>

        <div style={navLinks}>
          <div style={{ position: "relative" }}>
            <Link to="/cart" style={{ color: "black", fontSize: "clamp(14px,1.5vw,22px)" }}>
              <FaShoppingCart />
            </Link>

            {cartItems.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-8px",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "clamp(8px,0.8vw,12px)",
                  fontWeight: "bold"
                }}
              >
                {cartItems.length}
              </span>
            )}
          </div>

          <button
            style={loginButtonStyle}
            onClick={() => setShowLoginPopup(true)}
          >
            Login
          </button>

          <button
            style={signupButtonStyle}
            onClick={() => setShowRegisterPopup(true)}
          >
            Sign Up
          </button>
        </div>
      </nav>

      {menuOpen && <div style={overlayStyle} onClick={() => setMenuOpen(false)}></div>}

      <div className="navbar-menu" style={sideMenuStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <img src={palmLogo} alt="Palm Logo" style={{ width: "40px", height: "40px" }} />
          <h2 style={{ margin: 0, fontSize: "20px" }}>Zenbaba Delivery</h2>
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <button
            style={{ ...loginButtonStyle, flex: 1 }}
            onClick={() => { setShowLoginPopup(true); setMenuOpen(false); }}
          >
            Login
          </button>

          <button
            style={{ ...signupButtonStyle, flex: 1 }}
            onClick={() => { setShowRegisterPopup(true); setMenuOpen(false); }}
          >
            Sign Up
          </button>
        </div>

        <p style={{ fontSize: "14px", color: "#555", marginBottom: "20px" }}>
          Please login or sign up first to access full features.
        </p>

        <Link to="/" style={linkStyle}><FaHome /> Home</Link>
        <Link to="/menu" style={linkStyle}><FaUtensils /> Menu</Link>
        <Link to="/cart" style={linkStyle}><FaShoppingCart /> Cart</Link>
        <Link to="/checkout" style={linkStyle}><FaCreditCard /> Checkout</Link>
        <Link to="/help" style={linkStyle}><FaQuestionCircle /> Help Center</Link>
        <Link to="/contact" style={linkStyle}><FaEnvelope /> Contact</Link>
        <Link to="/restaurants" style={linkStyle}><FaUtensils /> Restaurants</Link>
      </div>
    </>
  );
}

export default Navbar;

