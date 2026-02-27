import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#f44336", color: "white" }}>
      <Link to="/" style={{ marginRight: "10px", color: "white" }}>Home</Link>
      <Link to="/cart" style={{ marginRight: "10px", color: "white" }}>Cart</Link>
      <Link to="/login" style={{ color: "white" }}>Login</Link>
    </nav>
  );
}

export default Navbar;