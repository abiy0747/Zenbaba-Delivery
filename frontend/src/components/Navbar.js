import { Link } from "react-router-dom";

function Navbar() {
  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 50px",
    backgroundColor: "#fcf7f6", // red brand color
    color: "white",
    fontFamily: "Arial, sans-serif",
    position: "relative",
    zIndex: 10,
  };

  const navLinks = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  };

  const buttonStyle = {
    padding: "8px 18px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "white",
  };

  return (
    <nav style={navStyle}>
      {/* Left side: Links */}
      <div style={navLinks}>
        <Link to="/" style={{ color: "black", textDecoration: "none", fontWeight: "bold" }}>
          Home
        </Link>
        <Link to="/cart" style={{ color: "black", textDecoration: "none", fontWeight: "bold" }}>
          Cart
        </Link>
      </div>

      {/* Right side: Buttons */}
      <div style={navLinks}>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <button style={{ ...buttonStyle, backgroundColor: "#060606" }}>Login</button>
        </Link>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <button style={{ ...buttonStyle, backgroundColor: "#090909" }}>Sign Up</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;