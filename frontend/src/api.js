import axios from "axios";

const API = axios.create({
  baseURL: "https://task-backend-mu-eight.vercel.app",
  withCredentials: true,
});

export default API;
