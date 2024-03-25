import axios from "./axios.js";

const jsonData = (data, method) => ({
  "class": "Record",
  "method": method,
  "params": data,
});

const jsonDataWithOutParams = (method) => ({
  "class": "Record",
  "method": method,
});

export const createRecordRequest = (data) => axios.post("/process", jsonData(data, 'createRecord'));

export const getRecordsRequest = () => axios.post("/process", jsonDataWithOutParams('getRecords'));

export const deleteRecordRequest = (id) => axios.post(`/process`, jsonData(id, 'deleteRecord'));

export const getPatientRecordsRequest = (id) => axios.post(`/process`, jsonData(id, 'getPatientRecords'));