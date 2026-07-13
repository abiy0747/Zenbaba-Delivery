import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/menu",
});

export const getMenus = async () => {
  const res = await API.get("/");
  return res.data;
};