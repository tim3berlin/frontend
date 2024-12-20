import axios from "axios";

const apiurl = process.env.REACT_APP_APIURI;
console.log("Test Halo:", apiurl);

const apiClient = axios.create({
  baseURL: apiurl,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  },
});

export default apiClient;
