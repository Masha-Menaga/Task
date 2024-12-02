import axios from "axios";

const API = axios.create({
  baseURL: "https://task-backend-mu-eight.vercel.app/",
  headers: {
    "Content-Type": "application/json", // Default content type for requests
  },
  timeout: 20000,
});

export default API;
