// src/components/Navbar.js
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaHome, FaUtensils, FaShoppingCart, FaCreditCard, FaQuestionCircle, FaEnvelope } from "react-icons/fa";
import palmLogo from "../assets/palm.png"; // add your palm logo in assets folder
import { useContext } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const { cartItems } = useContext(ShoppingCartContext);
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".navbar-menu") && !e.target.closest(".hamburger-icon")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Styles
  const navStyle = {
    display: "flex",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
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
    backgroundColor: "#3AB795",
    color: "white",
  };

  const signupButtonStyle = {
    padding: "8px 18px",
    border: "1px solid #3AB795",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    backgroundColor: "transparent",
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
  boxShadow: menuOpen ? "2px 0 10px rgba(0,0,0,0.2)" : "none",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  zIndex: 2000,
  transition: "transform 0.3s ease",
  transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
  overflowY: "auto"   // ⭐ THIS FIXES THE PROBLEM
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
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  return (
    <>
      {/* Navbar */}
      <nav style={navStyle}>
        <div style={navLinks}>
          <div
            className="hamburger-icon"
            style={{ fontSize: "24px", cursor: "pointer" }}
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
  <Link to="/cart" style={{ color: "black", fontSize: "22px" }}>
    <FaShoppingCart />
  </Link>

  {cartItems.length > 0 && (
    <span
      style={{
        position: "absolute",
        top: "-8px",
        right: "-10px",
        backgroundColor: "red",
        color: "white",
        borderRadius: "50%",
        padding: "2px 7px",
        fontSize: "12px",
        fontWeight: "bold",
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

      {/* Overlay */}
      {menuOpen && <div style={overlayStyle} onClick={() => setMenuOpen(false)}></div>}

      {/* Side Menu */}
      <div className="navbar-menu" style={sideMenuStyle}>
        {/* Logo and Name */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <img src={palmLogo} alt="Palm Logo" style={{ width: "40px", height: "40px" }} />
          <h2 style={{ margin: 0, fontSize: "20px" }}>Zenbaba Delivery</h2>
        </div>

        {/* Login/SignUp buttons side by side */}
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

        {/* Message */}
        <p style={{ fontSize: "14px", color: "#555", marginBottom: "20px" }}>
          Please login or sign up first to access full features.
        </p>

        {/* Menu Links with Icons */}
        <Link to="/" style={linkStyle} onClick={() => setMenuOpen(false)}>
          <FaHome /> Home
        </Link>
        <Link to="/menu" style={linkStyle} onClick={() => setMenuOpen(false)}>
          <FaUtensils /> Menu
        </Link>
        <Link to="/cart" style={linkStyle} onClick={() => setMenuOpen(false)}>
          <FaShoppingCart /> Cart
        </Link>
        <Link to="/checkout" style={linkStyle} onClick={() => setMenuOpen(false)}>
          <FaCreditCard /> Checkout
        </Link>
        <Link to="/help" style={linkStyle} onClick={() => setMenuOpen(false)}>
          <FaQuestionCircle /> Help Center
        </Link>
      <Link to="/contact" style={linkStyle} onClick={() => setMenuOpen(false)}>
  <FaEnvelope /> Contact
</Link>
      <Link to="/restaurants" style={linkStyle} onClick={() => setMenuOpen(false)}>
  <FaUtensils /> Restaurants
</Link>
      </div>

      {/* Login Popup */}
      {showLoginPopup && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 3000,
        }}>
          <div style={{
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "10px",
            width: "350px",
            maxWidth: "90%",
            position: "relative",
          }}>
            <button
              onClick={() => setShowLoginPopup(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "transparent",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
            <h2>Login</h2>
            <form style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "15px" }}>
              <input type="email" placeholder="Email" style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }} />
              <input type="password" placeholder="Password" style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }} />
              <button style={{ padding: "10px", borderRadius: "5px", backgroundColor: "#3AB795", color: "white", border: "none", cursor: "pointer" }}>
                Login
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Register Popup */}
      {showRegisterPopup && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 3000,
        }}>
          <div style={{
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "10px",
            width: "350px",
            maxWidth: "90%",
            position: "relative",
          }}>
            <button
              onClick={() => setShowRegisterPopup(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "transparent",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
            <h2>Sign Up</h2>
            <form style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "15px" }}>
              <input type="text" placeholder="Full Name" style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }} />
              <input type="email" placeholder="Email" style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }} />
              <input type="password" placeholder="Password" style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }} />
              <button style={{ padding: "10px", borderRadius: "5px", backgroundColor: "#3AB795", color: "white", border: "none", cursor: "pointer" }}>
                Sign Up
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;