import React, { useState, useEffect } from "react";
import "../Css/menu.css";
import { getMenus } from "../services/menuService";
import { useCart } from "../context/CartContext";
function Menu() {
   const { addItem } = useCart();
  const [menuItems, setMenuItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  useEffect(() => {

  loadMenus();

}, []);

const loadMenus = async () => {

  try {

    const data = await getMenus();

    console.log(data);

    if (data.success) {

      setMenuItems(data.data);

    }

  } catch (error) {

    console.log(error);

  }

};

  const filteredItems = menuItems.filter((item) => {
  return (
    (category === "All" || item.category === category) &&
    item.name.toLowerCase().includes(search.toLowerCase()) &&
   (
 !selectedRestaurant ||
 item.restaurant.name === selectedRestaurant.name
)
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
        {[
"All",
"Burger"
].map((cat) => (
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
          <div key={item._id} className="menu-card">
            <div className="image-wrapper">
              <img
src={
  item.image
    ? item.image
    : "https://via.placeholder.com/300x200?text=No+Image"
}
alt={item.name}
/>

              <div className="overlay">
                <span>⭐ {item.rating}</span>
                <span>{item.time}</span>
              </div>
            </div>

            <div className="menu-content">
              <h3>{item.name}</h3>
              <p>{item.restaurant.name}</p>

              <div className="menu-footer">
                <span>${item.price.toFixed(2)}</span>

              <button
 className="add-btn"
 onClick={() => {
   console.log("ADDING ITEM:", item._id);
   addItem(item._id);
 }}
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