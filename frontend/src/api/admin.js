import axios from "./axios.js";

const jsonData = (data, method) => ({
  "class": "Security",
  "method": method,
  "params": data,
});

const jsonDataWithOutParams = (method) => ({
  "class": "Security",
  "method": method,
});

export const getAllUsers = () => axios.post("/process", jsonDataWithOutParams('getAllUsers'));

export const getUser = (data) => axios.post("/process", jsonData(data, 'getUser'));

export const deleteUser = (data) => axios.post("/process", jsonData(data, 'deleteUser'));