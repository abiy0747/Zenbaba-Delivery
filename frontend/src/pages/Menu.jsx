import React, { useState, useEffect, useContext } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext";

function Menu() {
  const { addToCart } = useContext(ShoppingCartContext);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    setMenuItems([
      {
        id: 1,
        name: "Pizza Margherita",
        price: 12.5,
        restaurant: "Bella Italia",
        image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
      },
      {
        id: 2,
        name: "Burger Combo",
        price: 9.99,
        restaurant: "Fast Burger",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      },
      {
        id: 3,
        name: "Sushi Platter",
        price: 18.0,
        restaurant: "Sushi House",
        image: "https://images.unsplash.com/photo-1562158070-57c0c9b7f9c7",
      },
    ]);
  }, []);

  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = "#2A8C76";
  };
  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = "#3AB795";
  };
  const handleMouseDown = (e) => {
    e.target.style.transform = "scale(0.95)";
  };
  const handleMouseUp = (e) => {
    e.target.style.transform = "scale(1)";
  };

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
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
              background: "white",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "100%", height: "180px", objectFit: "cover" }}
            />
            <div style={{ padding: "15px", textAlign: "center" }}>
              <h3>{item.name}</h3>
              <p>Restaurant: {item.restaurant}</p>
              <p style={{ fontWeight: "bold" }}>Price: ${item.price.toFixed(2)}</p>
              <button
                onClick={() => addToCart(item)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#3AB795",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "all 0.1s ease-in-out",
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;