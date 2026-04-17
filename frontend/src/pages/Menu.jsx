import React, { useState, useEffect, useContext } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import "../Css/menu.css";

function Menu() {
  const { addToCart } = useContext(ShoppingCartContext);

  const [menuItems, setMenuItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  useEffect(() => {
  setMenuItems([
    // 🍲 TRADITIONAL
    {
      id: 1,
      name: "Doro Wat",
      price: 8.5,
      category: "Traditional",
      restaurant: "Abay Cultural Restaurant",
      rating: 4.8,
      time: "30-40 min",
      image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
    },
    {
      id: 2,
      name: "Kitfo",
      price: 10,
      category: "Traditional",
      restaurant: "Tana Traditional House",
      rating: 4.7,
      time: "25-35 min",
      image: "https://images.unsplash.com/photo-1625944234090-c9b1f6b2c9d3",
    },
    {
      id: 3,
      name: "Injera & Shiro",
      price: 6,
      category: "Traditional",
      restaurant: "Local Taste",
      rating: 4.6,
      time: "20-30 min",
      image: "https://images.unsplash.com/photo-1617196038433-4c90e1c13c4c",
    },
    {
      id: 4,
      name: "Tibs",
      price: 9,
      category: "Traditional",
      restaurant: "Abay View Hotel",
      rating: 4.5,
      time: "25-35 min",
      image: "https://images.unsplash.com/photo-1605475128023-0f3f1c5d0f16",
    },
    {
      id: 5,
      name: "Firfir",
      price: 5.5,
      category: "Traditional",
      restaurant: "Morning Star Cafe",
      rating: 4.4,
      time: "15-25 min",
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    },

    // 🐟 FISH
    {
      id: 6,
      name: "Fried Fish",
      price: 11,
      category: "Fish",
      restaurant: "Lake Tana Fish House",
      rating: 4.9,
      time: "20-30 min",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947",
    },
    {
      id: 7,
      name: "Grilled Fish",
      price: 12,
      category: "Fish",
      restaurant: "Tana Resort",
      rating: 4.7,
      time: "25-35 min",
      image: "https://images.unsplash.com/photo-1553621042-f6e147245754",
    },
    {
      id: 8,
      name: "Fish Tibs",
      price: 10,
      category: "Fish",
      restaurant: "Blue Nile Restaurant",
      rating: 4.6,
      time: "20-30 min",
      image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
    },
    {
      id: 9,
      name: "Fish Sandwich",
      price: 7,
      category: "Fish",
      restaurant: "Fast Fish",
      rating: 4.3,
      time: "15-20 min",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
    },
    {
      id: 10,
      name: "Fish Soup",
      price: 6.5,
      category: "Fish",
      restaurant: "Lake View Cafe",
      rating: 4.4,
      time: "20-30 min",
      image: "https://images.unsplash.com/photo-1605475128023-0f3f1c5d0f16",
    },

    // 🍗 FAST FOOD
    {
      id: 11,
      name: "Burger",
      price: 7,
      category: "Fast Food",
      restaurant: "Fast Burger",
      rating: 4.2,
      time: "15-25 min",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
    },
    {
      id: 12,
      name: "Pizza",
      price: 9,
      category: "Fast Food",
      restaurant: "Pizza Corner",
      rating: 4.5,
      time: "20-30 min",
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    },
    {
      id: 13,
      name: "Chicken Wrap",
      price: 6.5,
      category: "Fast Food",
      restaurant: "Wrap House",
      rating: 4.3,
      time: "15-20 min",
      image: "https://images.unsplash.com/photo-1606755962773-d324e9c83d8b",
    },
    {
      id: 14,
      name: "Fries Combo",
      price: 5,
      category: "Fast Food",
      restaurant: "Snack Spot",
      rating: 4.1,
      time: "10-15 min",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add",
    },
    {
      id: 15,
      name: "Hot Dog",
      price: 4.5,
      category: "Fast Food",
      restaurant: "Street Bites",
      rating: 4.0,
      time: "10-15 min",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
    },

    // ☕ DRINKS
    {
      id: 16,
      name: "Ethiopian Coffee",
      price: 2.5,
      category: "Drinks",
      restaurant: "Coffee House",
      rating: 5.0,
      time: "5-10 min",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    },
    {
      id: 17,
      name: "Macchiato",
      price: 3,
      category: "Drinks",
      restaurant: "Cafe Aroma",
      rating: 4.7,
      time: "5-10 min",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    },
    {
      id: 18,
      name: "Fresh Juice",
      price: 3.5,
      category: "Drinks",
      restaurant: "Juice Bar",
      rating: 4.6,
      time: "5-10 min",
      image: "https://images.unsplash.com/photo-1571689936114-b4c5f7c2c43d",
    },
    {
      id: 19,
      name: "Soft Drink",
      price: 1.5,
      category: "Drinks",
      restaurant: "Any Shop",
      rating: 4.0,
      time: "5 min",
      image: "https://images.unsplash.com/photo-1580910051074-3eb694886505",
    },
    {
      id: 20,
      name: "Milk Shake",
      price: 4,
      category: "Drinks",
      restaurant: "Shake Hub",
      rating: 4.5,
      time: "10 min",
      image: "https://images.unsplash.com/photo-1577801598243-2b6d1e1e7e4d",
    },

    // 🍞 BREAKFAST
    {
      id: 21,
      name: "Chechebsa",
      price: 4,
      category: "Breakfast",
      restaurant: "Morning Cafe",
      rating: 4.6,
      time: "10-15 min",
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    },
    {
      id: 22,
      name: "Genfo",
      price: 3.5,
      category: "Breakfast",
      restaurant: "Traditional Cafe",
      rating: 4.4,
      time: "10-15 min",
      image: "https://images.unsplash.com/photo-1605475128023-0f3f1c5d0f16",
    },
    {
      id: 23,
      name: "Bread & Egg",
      price: 3,
      category: "Breakfast",
      restaurant: "Quick Bite",
      rating: 4.2,
      time: "10 min",
      image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759",
    },
    {
      id: 24,
      name: "Pancake",
      price: 4.5,
      category: "Breakfast",
      restaurant: "Sweet House",
      rating: 4.5,
      time: "10-15 min",
      image: "https://images.unsplash.com/photo-1550317138-10000687a72b",
    },
    {
      id: 25,
      name: "Omelette",
      price: 3.5,
      category: "Breakfast",
      restaurant: "Morning Star",
      rating: 4.3,
      time: "10 min",
      image: "https://images.unsplash.com/photo-1516685018646-549198525c1b",
    },
  ]);
}, []);

  const filteredItems = menuItems.filter((item) => {
  return (
    (category === "All" || item.category === category) &&
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (!selectedRestaurant || item.restaurant === selectedRestaurant.name)
  );
});

  return (
    <div className="menu-container">
      <h1 className="menu-title">🍔 Discover Your Meal</h1>

      {/* SEARCH */}
      <input
        className="menu-search"
        placeholder="Search delicious food..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTER */}
      <div className="menu-filters">
        {["All", "Traditional", "Fish", "Fast Food", "Drinks", "Breakfast"].map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${category === cat ? "active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* MENU GRID */}
      <div className="menu-grid">
        {filteredItems.map((item) => (
          <div key={item.id} className="menu-card">
            <div className="image-wrapper">
              <img src={item.image} alt={item.name} />

              <div className="overlay">
                <span>⭐ {item.rating}</span>
                <span>{item.time}</span>
              </div>
            </div>

            <div className="menu-content">
              <h3>{item.name}</h3>
              <p>{item.restaurant}</p>

              <div className="menu-footer">
                <span>${item.price.toFixed(2)}</span>

                <button
                  className="add-btn"
                  onClick={() => addToCart(item)}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;