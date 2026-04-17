import React, { useState, useEffect } from "react";
import RestaurantCard from "../components/RestaurantCard";
import "../Css/restaurants.css";

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  
  useEffect(() => {
  setRestaurants([
    // 🏛️ Traditional Dining (5)
    {
      id: 1,
      name: "Abay Cultural Restaurant",
      type: "Traditional Dining",
      image: "https://images.unsplash.com/photo-1555992336-03a23c7b20ee",
      rating: 4.8,
      deliveryTime: "30-40 min",
    },
    {
      id: 2,
      name: "Tana Heritage House",
      type: "Traditional Dining",
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1",
      rating: 4.7,
      deliveryTime: "25-35 min",
    },
    {
      id: 3,
      name: "Blue Nile Traditional",
      type: "Traditional Dining",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      rating: 4.6,
      deliveryTime: "30 min",
    },
    {
      id: 4,
      name: "Bahir Dar Culture Kitchen",
      type: "Traditional Dining",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      rating: 4.5,
      deliveryTime: "35 min",
    },
    {
      id: 5,
      name: "Injera House",
      type: "Traditional Dining",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
      rating: 4.6,
      deliveryTime: "30-40 min",
    },

    // 🍽️ Fine Dining (5)
    {
      id: 6,
      name: "Lake Tana Resort",
      type: "Fine Dining",
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9",
      rating: 4.9,
      deliveryTime: "25-35 min",
    },
    {
      id: 7,
      name: "Golden Palace",
      type: "Fine Dining",
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
      rating: 4.8,
      deliveryTime: "30 min",
    },
    {
      id: 8,
      name: "Sky Lounge Bahir Dar",
      type: "Fine Dining",
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
      rating: 4.7,
      deliveryTime: "30-40 min",
    },
    {
      id: 9,
      name: "Luxury Nile View",
      type: "Fine Dining",
      image: "https://images.unsplash.com/photo-1504718855392-c0f33b372e72",
      rating: 4.9,
      deliveryTime: "35 min",
    },
    {
      id: 10,
      name: "Royal Dining Hall",
      type: "Fine Dining",
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9",
      rating: 4.8,
      deliveryTime: "30 min",
    },

    // 🍔 Fast Food (5)
    {
      id: 11,
      name: "Fast Burger",
      type: "Fast Food",
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9",
      rating: 4.2,
      deliveryTime: "15-25 min",
    },
    {
      id: 12,
      name: "Quick Bites",
      type: "Fast Food",
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1",
      rating: 4.1,
      deliveryTime: "15 min",
    },
    {
      id: 13,
      name: "Snack Hub",
      type: "Fast Food",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      rating: 4.0,
      deliveryTime: "10-20 min",
    },
    {
      id: 14,
      name: "Street Grill",
      type: "Fast Food",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      rating: 4.3,
      deliveryTime: "15-20 min",
    },
    {
      id: 15,
      name: "Burger Spot",
      type: "Fast Food",
      image: "https://images.unsplash.com/photo-1555992336-03a23c7b20ee",
      rating: 4.2,
      deliveryTime: "20 min",
    },

    // ☕ Cafe (5)
    {
      id: 16,
      name: "Tana Coffee House",
      type: "Cafe",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
      rating: 5.0,
      deliveryTime: "10-15 min",
    },
    {
      id: 17,
      name: "Aroma Cafe",
      type: "Cafe",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
      rating: 4.7,
      deliveryTime: "10 min",
    },
    {
      id: 18,
      name: "Coffee Corner",
      type: "Cafe",
      image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31",
      rating: 4.6,
      deliveryTime: "10-15 min",
    },
    {
      id: 19,
      name: "Lake View Cafe",
      type: "Cafe",
      image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17",
      rating: 4.8,
      deliveryTime: "15 min",
    },
    {
      id: 20,
      name: "Morning Brew",
      type: "Cafe",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb",
      rating: 4.5,
      deliveryTime: "10 min",
    },

    // 🍜 Casual Dining (5)
    {
      id: 21,
      name: "Blue Nile Lounge",
      type: "Casual Dining",
      image: "https://images.unsplash.com/photo-1555992336-03a23c7b20ee",
      rating: 4.6,
      deliveryTime: "20-30 min",
    },
    {
      id: 22,
      name: "Family Kitchen",
      type: "Casual Dining",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      rating: 4.4,
      deliveryTime: "25 min",
    },
    {
      id: 23,
      name: "Urban Eatery",
      type: "Casual Dining",
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1",
      rating: 4.5,
      deliveryTime: "20-30 min",
    },
    {
      id: 24,
      name: "City Taste",
      type: "Casual Dining",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
      rating: 4.3,
      deliveryTime: "25 min",
    },
    {
      id: 25,
      name: "Friendly Bites",
      type: "Casual Dining",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      rating: 4.4,
      deliveryTime: "20 min",
    },

    // 🌮 Street Food (5)
    {
      id: 26,
      name: "Street Bites Bahir Dar",
      type: "Street Food",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      rating: 4.3,
      deliveryTime: "10-15 min",
    },
    {
      id: 27,
      name: "Quick Street Grill",
      type: "Street Food",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      rating: 4.2,
      deliveryTime: "10 min",
    },
    {
      id: 28,
      name: "Night Snacks",
      type: "Street Food",
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1",
      rating: 4.1,
      deliveryTime: "10-15 min",
    },
    {
      id: 29,
      name: "Mini Bites",
      type: "Street Food",
      image: "https://images.unsplash.com/photo-1555992336-03a23c7b20ee",
      rating: 4.0,
      deliveryTime: "10 min",
    },
    {
      id: 30,
      name: "Express Food Corner",
      type: "Street Food",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
      rating: 4.2,
      deliveryTime: "15 min",
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