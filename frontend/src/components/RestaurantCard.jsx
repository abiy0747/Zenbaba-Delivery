import React from "react";
import "../Css/restaurantCard.css";

function RestaurantCard({ restaurant }) {
  return (
    <div className="restaurant-card">
      <img src={restaurant.image} alt={restaurant.name} />

      <div className="overlay">
        ⭐ {restaurant.rating}
        <span>{restaurant.deliveryTime}</span>
      </div>

      <div className="info">
        <h3>{restaurant.name}</h3>
        <p>{restaurant.category}</p>
      </div>
    </div>
  );
}

export default RestaurantCard;