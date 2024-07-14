import axios from "axios";

export const instance = axios.create({
  baseURL: "https://project-aquatrack-back.onrender.com",
});

export const setAuthHeader = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  instance.defaults.headers.common.Authorization = "";
};
