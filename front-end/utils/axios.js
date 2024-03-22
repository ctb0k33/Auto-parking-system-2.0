import axios from "axios";

const url = "http://192.168.2.110:3000";

const axiosInstance = axios.create({
  baseURL: url,
  responseType: "json",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
