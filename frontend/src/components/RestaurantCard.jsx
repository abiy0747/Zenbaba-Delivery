import React from "react";
import "../Css/restaurantCard.css";

function RestaurantCard({ restaurant, onSelect }) {
  return (
    <div
      className="restaurant-card"
      onClick={() => {
        console.log("CLICKED:", restaurant.name); // 🔥 TEST
        onSelect(restaurant);
      }}
    >
      <img src={restaurant.image} alt={restaurant.name} />

      <div className="overlay">
        <span>⭐ {restaurant.rating}</span>
        <span>{restaurant.deliveryTime}</span>
      </div>

      <div className="info">
        <h3>{restaurant.name}</h3>
        <p>{restaurant.type}</p>
      </div>
    </div>
  );
}

export default RestaurantCard;