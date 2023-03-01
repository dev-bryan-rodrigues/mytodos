import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3333",
});

export const api = {
  get(endpoint, config) {
    return axiosInstance.get(endpoint, config);
  },
  post(endpoint, body) {
    return axiosInstance.post(endpoint, body);
  },
  put(endpoint, body) {
    return axiosInstance.put(endpoint, body);
  },
  delete(endpoint) {
    return axiosInstance.delete(endpoint);
  },
};
