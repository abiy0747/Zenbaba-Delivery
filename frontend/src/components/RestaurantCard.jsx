import React from "react";
import { Link } from "react-router-dom";

function RestaurantCard({ restaurant }) {
  return (
    <Link to={`/menu/${restaurant.id}`} style={{ textDecoration: "none", color: "black" }}>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          cursor: "pointer",
        }}
      >
        <img
          src={restaurant.image}
          alt={restaurant.name}
          style={{ width: "100%", height: "180px", objectFit: "cover" }}
        />

        <div style={{ padding: "15px" }}>
          <h3>{restaurant.name}</h3>
          <p>⭐ {restaurant.rating}</p>
          <p>{restaurant.deliveryTime}</p>
        </div>
      </div>
    </Link>
  );
}

export default RestaurantCard;