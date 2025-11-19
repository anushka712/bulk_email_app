import { axiosInstance } from "../../configs/axios";

import { createBaseService } from "../baseService";

export const createUserService = () => {
  const baseService = createBaseService("/users");

  /**
   * @desc Registers new user with backend
   * @returns Registered user data
   */
  const registerUser = async (newUser) => {
    const response = await axiosInstance.post("/users/register", newUser);
    return response.data;
  };

  return {
    ...baseService,
    registerUser,
  };
};
