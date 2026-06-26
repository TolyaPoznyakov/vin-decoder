import axios from "axios";

const api = axios.create({
  baseURL: "https://vpic.nhtsa.dot.gov/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;