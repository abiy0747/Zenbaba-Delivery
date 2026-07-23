import React, { useState } from "react";
import axios from "axios";
import { FaStore } from "react-icons/fa";
import "../Css/RestaurantApplication.css";
import toast from "react-hot-toast";
function RestaurantApplication() {
  const [formData, setFormData] = useState({
    restaurantName: "",
    phone: "",
    city: "",
    address: "",
    category: "",
    openingTime: "",
    closingTime: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/applications/restaurant",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Restaurant application submitted successfully!");

      setFormData({
        restaurantName: "",
        phone: "",
        city: "",
        address: "",
        category: "",
        openingTime: "",
        closingTime: "",
        description: "",
      });
    } catch (error) {
      toast.error(
  error.response?.data?.message || "Application failed"
);
    }
  };

  return (
    <div className="restaurant-page">

      <div className="restaurant-header">

        <div className="restaurant-icon">
          <FaStore />
        </div>

        <h1>Become a Restaurant Partner</h1>

        <p>
          Join Zenbaba Delivery and grow your business across Ethiopia.
        </p>

      </div>

      <form
        className="restaurant-form"
        onSubmit={handleSubmit}
      >

        <h2>Restaurant Application</h2>

        <div className="restaurant-grid">

          <div className="input-box">
            <label>Restaurant Name</label>

            <input
              type="text"
              name="restaurantName"
              placeholder="Restaurant Name"
              value={formData.restaurantName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>Phone Number</label>

            <input
              type="text"
              name="phone"
              placeholder="0912345678"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>City</label>

            <input
              type="text"
              name="city"
              placeholder="Bahir Dar"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>Restaurant Address</label>

            <input
              type="text"
              name="address"
              placeholder="Full Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>Category</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="ethiopian">Ethiopian Food</option>
              <option value="fast-food">Fast Food</option>
              <option value="cafe">Cafe</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="input-box">
            <label>Opening Time</label>

            <input
              type="time"
              name="openingTime"
              value={formData.openingTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>Closing Time</label>

            <input
              type="time"
              name="closingTime"
              value={formData.closingTime}
              onChange={handleChange}
              required
            />
          </div>

        </div>

        <div className="full-input">

          <label>Description</label>

          <textarea
            name="description"
            placeholder="Tell customers about your restaurant..."
            value={formData.description}
            onChange={handleChange}
          />

        </div>

        <button
          type="submit"
          className="submit-restaurant"
        >
          Submit Application
        </button>

      </form>

    </div>
  );
}

export default RestaurantApplication;