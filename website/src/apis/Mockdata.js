import axios from "axios";

const API_BASE_URL = "https://heliverse-server-v1.onrender.com/api/users";

export default axios.create({
  baseURL: API_BASE_URL,
});