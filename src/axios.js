import axios from "axios";
import store from "./store";

export default function axiosSetUp() {
  axios.defaults.baseURL = process.env.VUE_APP_API_URL;
  axios.interceptors.request.use(
    function(config) {
      if (config.url.includes("token/refresh")) {
        const token = localStorage.getItem("refresh_token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } else {
        const token = localStorage.getItem("access_token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function(response) {
      return response;
    },
    async function(error) {
      const originalRequest = error.config;
      if (
        (error.response.status === 401 || error.response.status === 400) &&
        originalRequest.url.includes("token/refresh")
      ) {
        store.commit("clearUserData");
        store.dispatch('logout');
        return Promise.reject(error);
      } else if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        await store.dispatch("refreshToken");
        return axios(originalRequest);
      }
      return Promise.reject(error);
    }
  );
}
