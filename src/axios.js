import axios from "axios";

const apiurl = "https://objective-maddi-harisafriansyah-03974b59.koyeb.app/";
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
