import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:7892",
});

export default instance;