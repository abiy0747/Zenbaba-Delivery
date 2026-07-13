import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/cart",
});

// Automatically attach token to every request
API.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});

// ======================
// Get My Cart
// ======================

export const getMyCart = async () => {

  const res = await API.get("/");

  return res.data;

};

// ======================
// Add Item
// ======================

export const addToCart = async (
  menuItemId,
  quantity = 1
) => {

  const res = await API.post("/", {
    menuItemId,
    quantity,
  });

  return res.data;

};

// ======================
// Update Quantity
// ======================

export const updateCart = async (
  menuItemId,
  quantity
) => {

  const res = await API.put(`/${menuItemId}`, {
    quantity,
  });

  return res.data;

};

// ======================
// Remove Item
// ======================

export const removeCartItem = async (
  menuItemId
) => {

  const res = await API.delete(
    `/${menuItemId}`
  );

  return res.data;

};

// ======================
// Clear Cart
// ======================

export const clearCart = async () => {

  const res = await API.delete("/");

  return res.data;

};