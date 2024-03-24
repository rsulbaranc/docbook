import axios from "./axios.js";

export const getUserRequest = (data) => axios.post("/getUser", data);