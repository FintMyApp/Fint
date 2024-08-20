// src/axiosConfig.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.0.103:8000/api",
  headers: {
    "Content-Type": "application/json",
    // Add any additional headers here
  },
});

export default axiosInstance;
