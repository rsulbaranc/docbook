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

export const getAllProfiles = () => axios.post("/process", jsonDataWithOutParams('getAllProfiles'));

export const createProfile = (data) => axios.post("/process", jsonData(data, 'createProfile'));

export const updateProfile = (data) => axios.post("/process", jsonData(data, 'updateProfile'));

export const deleteProfile = (data) => axios.post("/process", jsonData(data, 'deleteProfile'));

export const createTypePerson = (data) => axios.post("/process", jsonData(data, 'createTypePerson'));

export const getAllTypePerson = () => axios.post("/process", jsonDataWithOutParams('getAllTypePerson'));

export const deleteTypePerson = (data) => axios.post("/process", jsonData(data, 'deleteTypePerson'));

export const createPerson = (data) => axios.post("/process", jsonData(data, 'createPerson'));

export const getAllPerson = () => axios.post("/process", jsonDataWithOutParams('getAllPerson'));

export const deletePerson = (data) => axios.post("/process", jsonData(data, 'deletePerson'));

export const updatePerson = (data) => axios.post("/process", jsonData(data, 'updatePerson'));

export const createUser = (data) => axios.post("/process", jsonData(data, 'createUser'));

export const updateUser = (data) => axios.post("/process", jsonData(data, 'updateUser'));

export const createProcess = (data) => axios.post("/process", jsonData(data, 'createProcess'));

export const getAllProcess = () => axios.post("/process", jsonDataWithOutParams('getAllProcess'));

export const deleteProcess = (data) => axios.post("/process", jsonData(data, 'deleteProcess'));

export const updateProcess = (data) => axios.post("/process", jsonData(data, 'updateProcess'));

export const createPermission = (data) => axios.post("/process", jsonData(data, 'createPermission'));

export const getAllPermissions = () => axios.post("/process", jsonDataWithOutParams('getPermissions'));

export const deletePermission = (data) => axios.post("/process", jsonData(data, 'deletePermission'));

export const createPersonPatient = (data) => axios.post("/process", jsonData(data, 'createPersonPatient'));