import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "./context/CartContext";

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    setMenuItems([
      { id: 1, name: "Pizza Margherita", price: 12.5, restaurant: "Bella Italia" },
      { id: 2, name: "Burger Combo", price: 9.99, restaurant: "Fast Burger" },
      { id: 3, name: "Sushi Platter", price: 18.0, restaurant: "Sushi House" },
    ]);
  }, []);

  return (
    <div style={{ padding: "80px 20px", maxWidth: "1200px", margin: "auto" }}>
      <h1>Menu</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "20px", marginTop: "30px" }}>
        {menuItems.map(item => (
          <div key={item.id} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "10px" }}>
            <h3>{item.name}</h3>
            <p>Restaurant: {item.restaurant}</p>
            <p>Price: ${item.price}</p>
            <button
              style={{ padding: "8px 15px", backgroundColor: "#3AB795", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
              onClick={() => addToCart(item)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;