import axios from "./axios.js";

const jsonData = (data, method) => ({
    "class": "Business",
    "method": method,
    "params": data,
  });