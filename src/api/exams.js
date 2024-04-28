import axios from "./axios.js";

const jsonData = (data, method) => ({
    "class": "Business",
    "method": method,
    "params": data,
  });


export const getPatientExamns = (ci) => axios.post(`/process`, jsonData(ci, 'getExams'));

export const updateExam = (data) => axios.post(`/process`, jsonData(data, 'updateExam'));