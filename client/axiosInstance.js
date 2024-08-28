import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.194.141:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
