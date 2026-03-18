import axios from "axios";

const instance = axios.create({
  baseURL: "https://products-website-io.onrender.com",
});

export default instance;
