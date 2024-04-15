import axios from "./axios.js";

const jsonData = (data, method) => ({
  "class": "Business",
  "method": method,
  "params": data,
});

const jsonDataWithOutParams = (method) => ({
  "class": "Business",
  "method": method,
});

export const createRecordRequest = (data) => axios.post("/process", jsonData(data, 'createRecord'));

export const getRecordsRequest = () => axios.post("/process", jsonDataWithOutParams('getRecordsUser'));

export const deleteRecordRequest = (id) => axios.post(`/process`, jsonData(id, 'deleteRecord'));

export const getPatientRecordsRequest = (id) => axios.post(`/process`, jsonData(id, 'getPatientRecords'));

export const updateRecordRequest = (data) => axios.post(`/process`, jsonData(data, 'updateRecord'));

export const getRecipeRequest = (data) => axios.post(`/process`, jsonData(data, 'getRecipe'));

export const updateRecipeRequest = (data) => axios.post(`/process`, jsonData(data, 'updateRecipe'));