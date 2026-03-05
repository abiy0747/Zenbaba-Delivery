import React, { useState, useEffect } from "react";
import RestaurantCard from "../components/RestaurantCard";

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    setRestaurants([
      {
        id: 1,
        name: "Bella Italia",
        image: "/assets/restaurants/italia.jpg",
        rating: 4.5,
        deliveryTime: "25-35 min",
      },
      {
        id: 2,
        name: "Fast Burger",
        image: "/assets/restaurants/burger.jpg",
        rating: 4.2,
        deliveryTime: "20-30 min",
      },
      {
        id: 3,
        name: "Sushi House",
        image: "/assets/restaurants/sushi.jpg",
        rating: 4.7,
        deliveryTime: "30-40 min",
      },
    ]);
  }, []);

  return (
    <div style={{ padding: "100px 20px", maxWidth: "1200px", margin: "auto" }}>
      <h1>Restaurants Near You</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}

export default Restaurants;