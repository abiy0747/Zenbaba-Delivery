import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/orders",
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
// Create Order
// ======================

export const createOrder = async (orderData) => {

  const res = await API.post("/", orderData);

  return res.data;

};

// ======================
// Get My Orders
// ======================

export const getMyOrders = async () => {

  const res = await API.get("/my-orders");

  return res.data;

};

// ======================
// Get Single Order
// ======================

export const getSingleOrder = async (orderId) => {

  const res = await API.get(`/${orderId}`);

  return res.data;

};

// ======================
// Cancel Order
// ======================

export const cancelOrder = async (orderId) => {

  const res = await API.delete(`/${orderId}`);

  return res.data;

};

// ======================
// Restaurant Orders
// ======================

export const getRestaurantOrders = async () => {

  const res = await API.get("/restaurant");

  return res.data;

};

// ======================
// Update Order Status
// ======================

export const updateOrderStatus = async (
  orderId,
  orderStatus
) => {

  const res = await API.put(
    `/${orderId}/status`,
    { orderStatus }
  );

  return res.data;

};