import { axiosInstance } from "../configs/axios.js";

export const createBaseService = (endpoint) => {
  const getAll = async (params = {}) => {
    const response = await axiosInstance.get(endpoint, { params });
    return response.data;
  };

  const create = async (data, headers = {}) => {
    const response = await axiosInstance.post(endpoint, data, headers);
    return response.data;
  };

  return {
    getAll,
    create,
  };
};
