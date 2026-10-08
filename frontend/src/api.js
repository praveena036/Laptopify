import axios from "axios";

const configuredApiUrl = import.meta.env.VITE_API_URL || "";
const apiBaseUrl = configuredApiUrl && !/^https?:\/\//i.test(configuredApiUrl)
  ? `https://${configuredApiUrl}`
  : configuredApiUrl;
const api = axios.create({ baseURL: apiBaseUrl });

let refreshRequest;

api.interceptors.request.use((config) => {
  const token = config.requiresAuth && localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status !== 401 || !originalRequest?.requiresAuth || originalRequest._retried) {
      return Promise.reject(error);
    }

    const refresh = localStorage.getItem("refresh_token");
    if (!refresh) {
      localStorage.removeItem("access_token");
      error.response.data = {
        message: "Your login session has expired. Please log in again to continue.",
      };
      return Promise.reject(error);
    }

    originalRequest._retried = true;
    try {
      refreshRequest ||= axios.post(
        `${api.defaults.baseURL}/api/auth/token/refresh/`,
        { refresh },
      ).finally(() => {
        refreshRequest = null;
      });
      const { data } = await refreshRequest;
      localStorage.setItem("access_token", data.access);
      originalRequest.headers.Authorization = `Bearer ${data.access}`;
      return api(originalRequest);
    } catch (refreshError) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      if (refreshError.response) {
        refreshError.response.data = {
          message: "Your login session has expired. Please log in again to continue.",
        };
      }
      return Promise.reject(refreshError);
    }
  },
);

export default api;
