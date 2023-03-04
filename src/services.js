import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3333",
});

export const api = {
  get(endpoint, config) {
    return axiosInstance.get(endpoint, config);
  },
  post(endpoint, body, config) {
    return axiosInstance.post(endpoint, body, config);
  },
  put(endpoint, body, config) {
    return axiosInstance.put(endpoint, body, config);
  },
  delete(endpoint, config) {
    return axiosInstance.delete(endpoint, config);
  },
};
