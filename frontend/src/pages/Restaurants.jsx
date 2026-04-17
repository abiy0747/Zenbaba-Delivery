import React, { useState, useEffect } from "react";
import RestaurantCard from "../components/RestaurantCard";
import "../Css/restaurants.css";

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
  setRestaurants([
    {
      id: 1,
      name: "Abay Cultural Restaurant",
      type: "Traditional Dining",
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
      rating: 4.8,
      deliveryTime: "30-40 min",
    },
    {
      id: 2,
      name: "Lake Tana Resort",
      type: "Fine Dining",
      image: "https://images.unsplash.com/photo-1553621042-f6e147245754",
      rating: 4.9,
      deliveryTime: "25-35 min",
    },
    {
      id: 3,
      name: "Fast Burger",
      type: "Fast Food",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      rating: 4.2,
      deliveryTime: "15-25 min",
    },
    {
      id: 4,
      name: "Tana Coffee House",
      type: "Cafe",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
      rating: 5.0,
      deliveryTime: "10-15 min",
    },
    {
      id: 5,
      name: "Street Bites Bahir Dar",
      type: "Street Food",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      rating: 4.3,
      deliveryTime: "10-20 min",
    },
    {
      id: 6,
      name: "Blue Nile Lounge",
      type: "Casual Dining",
      image: "https://images.unsplash.com/photo-1555992336-03a23c7b20ee",
      rating: 4.6,
      deliveryTime: "20-30 min",
    },
  ]);
}, []);
  const filtered = restaurants.filter((r) => {
    return (
      (category === "All" || r.type === category) &&
      r.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="restaurants-page">

      {/* HERO */}
      <div className="restaurants-hero">
        <h1>Discover Restaurants in Bahir Dar</h1>
        <p>From traditional Ethiopian food to modern bites 🍽️</p>
      </div>

      {/* SEARCH */}
      <div className="restaurants-search">
        <input
          type="text"
          placeholder="Search restaurants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* CATEGORY FILTER */}
      <div className="restaurants-filters">
        {[
  "All",
  "Traditional Dining",
  "Fine Dining",
  "Casual Dining",
  "Cafe",
  "Fast Food",
  "Street Food",
].map(
          (cat) => (
            <button
              key={cat}
              className={category === cat ? "active" : ""}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          )
        )}
      </div>

      {/* GRID */}
      <div className="restaurants-grid">
        {filtered.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}

export default Restaurants;