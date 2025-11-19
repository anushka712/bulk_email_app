import axios from "axios";

const createAxiosInstance = (config = {}) => {
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
    ...config,
  });

  instance.interceptors.request.use(
    (config) => {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

      if (loggedInUser?.token) {
        config.headers.Authorization = `Bearer ${loggedInUser.token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};

export const axiosInstance = createAxiosInstance();
