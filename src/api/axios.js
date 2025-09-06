import axios from "axios";

// The variable must start with REACT_APP_ to be accessible in the frontend
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"; // for Vite
// If using CRA: const baseURL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL,
  withCredentials: true, // important for cookie-based auth
});

export default api;
