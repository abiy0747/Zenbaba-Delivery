import React, { useState, useEffect, useContext } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext";

function Menu() {
  const { addToCart } = useContext(ShoppingCartContext);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    setMenuItems([
      { id: 1, name: "Pizza Margherita", price: 12.5, restaurant: "Bella Italia" },
      { id: 2, name: "Burger Combo", price: 9.99, restaurant: "Fast Burger" },
      { id: 3, name: "Sushi Platter", price: 18.0, restaurant: "Sushi House" },
    ]);
  }, []);

  return (
    <div style={{ padding: "100px 20px", maxWidth: "1200px", margin: "auto" }}>
      <h1>Menu</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {menuItems.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <h3>{item.name}</h3>
            <p>Restaurant: {item.restaurant}</p>
            <p>Price: ${item.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(item)}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#3AB795",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
              }}
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