import axios from "axios";

const url = "http://192.168.26.158:3000/api/v1";

const axiosInstance = axios.create({
  baseURL: url,
  responseType: "json",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
