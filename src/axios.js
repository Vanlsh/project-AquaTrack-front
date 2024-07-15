import axios from "axios";
import { logOutReducer, setToken } from "./redux/auth/slice.js";
import { store } from "./redux/store.js";

const BASE_URL = "https://project-aquatrack-back.onrender.com";

export const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
//
// // export const setAuthHeader = (token) => {
// //   instance.defaults.headers.common.Authorization = `Bearer ${token}`;
// // };
// //
// // export const clearAuthHeader = () => {
// //   instance.defaults.headers.common.Authorization = "";
// // };
//
instance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post(`${BASE_URL}` + "/auth/refresh");
        // axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token ;
        store.dispatch(setToken(response.data.token));
        return instance(originalRequest);
      } catch (error) {
        if (error.response.status === 401) {
          store.dispatch(logOutReducer());
        }
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
