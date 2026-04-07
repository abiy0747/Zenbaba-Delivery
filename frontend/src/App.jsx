// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
// Import the provider (note the correct capitalization)
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import Restaurants from "./pages/Restaurants";
import HelpCenter from "./pages/HelpCenter";
import Contact from "./pages/Contact";

function App() {
  return (
    
    <ShoppingCartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/restaurants" element={<Restaurants />} />
       <Route path="/help" element={<HelpCenter />} />
       <Route path="/contact" element={<Contact />} />

        </Routes>
      </Router>
    </ShoppingCartProvider>
  );
}

export default App;