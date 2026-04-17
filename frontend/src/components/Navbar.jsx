import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { FaHome, FaUtensils, FaShoppingCart, FaCreditCard, FaQuestionCircle, FaEnvelope, FaUser } from "react-icons/fa";
import palmLogo from "../assets/palm.png";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import Login from "../pages/Login";
import Register from "../pages/Register";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [user, setUser] = useState(null);
  const [sidebarProfileOpen, setSidebarProfileOpen] = useState(false);
  const [navbarProfileOpen, setNavbarProfileOpen] = useState(false);

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

  const handleLogout = () => {
    setUser(null);
    setSidebarProfileOpen(false);
    setNavbarProfileOpen(false);
  };

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
    whiteSpace: "nowrap",
  };

  const navLinks = {
    display: "flex",
    alignItems: "center",
    gap: "clamp(6px,1.5vw,20px)",
    fontSize: "clamp(11px,1.2vw,16px)",
  };

  const loginButtonStyle = {
    padding: "clamp(3px,0.5vw,8px) clamp(8px,1vw,18px)",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    backgroundColor: "#3AB795",
    color: "white",
    fontSize: "clamp(10px,1vw,14px)",
  };

  const signupButtonStyle = {
    padding: "clamp(3px,0.5vw,8px) clamp(8px,1vw,18px)",
    border: "1px solid #3AB795",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    backgroundColor: "transparent",
    color: "#3AB795",
    fontSize: "clamp(10px,1vw,14px)",
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
    overflowY: "auto",
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
    fontSize: "clamp(12px,1.2vw,18px)",
    padding: "10px 0",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const profileDropdownStyle = {
    position: "absolute",
    top: "100%",
    right: 0, // aligned to right for navbar dropdown
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    width: "220px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    zIndex: 3000,
  };

  const sidebarProfileDropdownStyle = {
    position: "absolute",
    top: "100%",
    left: 0,
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    width: "220px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    zIndex: 3000,
  };

  return (
    <>
      {/* Navbar */}
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
          <Link to="/About" style={{ color: "black", textDecoration: "none", fontWeight: "bold" }}>
            AboutUs
          </Link>
          <Link to="/faq" style={{ color: "black", textDecoration: "none", fontWeight: "bold" }}>
            FAQ
          </Link>
            
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", position: "relative" }}>
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
                  fontWeight: "bold",
                }}
              >
                {cartItems.length}
              </span>
            )}
          </div>

          {/* Navbar Profile */}
          {user ? (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setNavbarProfileOpen(!navbarProfileOpen)}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "22px",
                  color: "#3AB795",
                }}
              >
                <FaUser />
              </button>
              {navbarProfileOpen && (
                <div style={profileDropdownStyle}>
                  <p><strong>{user.name}</strong></p>
                  <p>{user.email}</p>
                  <button
                    style={{ ...loginButtonStyle, width: "100%" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button style={loginButtonStyle} onClick={() => setShowLoginPopup(true)}>
                Login
              </button>
              <button style={signupButtonStyle} onClick={() => setShowRegisterPopup(true)}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

      {menuOpen && <div style={overlayStyle} onClick={() => setMenuOpen(false)}></div>}

      {/* Sidebar */}
      <div className="navbar-menu" style={sideMenuStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <img src={palmLogo} alt="Palm Logo" style={{ width: "40px", height: "40px" }} />
          <h2 style={{ margin: 0, fontSize: "20px" }}>Zenbaba Delivery</h2>
        </div>

        {/* Sidebar Profile at Top */}
       
       {/* ===== SIDEBAR AUTH SECTION ===== */}
<div style={{ position: "relative", marginBottom: "20px" }}>
  {user ? (
    <>
      {/* Profile Button */}
      <button
        onClick={() => setSidebarProfileOpen(!sidebarProfileOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontSize: "18px",
          color: "#3AB795",
        }}
      >
        <FaUser />
        {user.name}
      </button>

      {/* Dropdown */}
      {sidebarProfileOpen && (
        <div style={sidebarProfileDropdownStyle}>
          <p><strong>{user.name}</strong></p>
          <p>{user.email}</p>

          <button
            style={{ ...loginButtonStyle, width: "100%" }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </>
  ) : (
    <>
  <div style={{ display: "flex", gap: "10px" }}>
    <button
      style={{ ...loginButtonStyle, flex: 1 }}
      onClick={() => {
        setMenuOpen(false);
        setShowLoginPopup(true);
      }}
    >
      Login
    </button>

    <button
      style={{ ...signupButtonStyle, flex: 1 }}
      onClick={() => {
        setMenuOpen(false);
        setShowRegisterPopup(true);
      }}
    >
      Sign Up
    </button>
  </div>
</>
  )}
</div>

        <Link to="/" style={linkStyle}><FaHome /> Home</Link>
        <Link to="/menu" style={linkStyle}><FaUtensils /> Menu</Link>
        <Link to="/cart" style={linkStyle}><FaShoppingCart /> Cart</Link>
        <Link to="/checkout" style={linkStyle}><FaCreditCard /> Checkout</Link>
        <Link to="/help" style={linkStyle}><FaQuestionCircle /> Help Center</Link>
        <Link to="/contact" style={linkStyle}><FaEnvelope /> Contact</Link>
        <Link to="/restaurants" style={linkStyle}><FaUtensils /> Restaurants</Link>
      
      </div>

      {showLoginPopup && (
        <Login
          onClose={() => setShowLoginPopup(false)}
          onSwitchToRegister={() => {
            setShowLoginPopup(false);
            setShowRegisterPopup(true);
          }}
          onLogin={(userData) => setUser(userData)}
        />
      )}

      {showRegisterPopup && (
        <Register
          onClose={() => setShowRegisterPopup(false)}
          onSwitchToLogin={() => {
            setShowRegisterPopup(false);
            setShowLoginPopup(true);
          }}
          onRegister={(userData) => setUser(userData)}
        />
      )}
    </>
  );
}

export default Navbar;