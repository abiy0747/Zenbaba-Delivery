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
import { AuthProvider } from "./context/AuthContext";
import Profile from "./pages/Profile";
import { CartProvider } from "./context/CartContext";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import RestaurantDashboard from "./pages/restaurant/RestaurantDashboard";
import RestaurantMenu from "./pages/restaurant/RestaurantMenu";
import AddMenu from "./pages/restaurant/AddMenu";
import EditMenu from "./pages/restaurant/EditMenu";
function App() {
  return (
    <AuthProvider>
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/restaurants" element={<Restaurants />} />
         
           <Route
  path="/my-orders"
  element={<MyOrders />}

/>
 <Route
 path="/orders/:id"
 element={<OrderDetails />}

/>
<Route
path="/restaurant-dashboard"
element={<RestaurantDashboard />}
/>
<Route
path="/restaurant-menu"
element={<RestaurantMenu/>}
/>
<Route
path="/add-menu"
element={<AddMenu/>}
/>
<Route
path="/edit-menu/:id"
element={<EditMenu/>}
/>
       <Route path="/help" element={<HelpCenter />} />
       <Route path="/contact" element={<Contact />} />

        </Routes>
      </Router>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;