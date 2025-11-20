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

  /**
   * @desc Authenticates user credentials
   * @returns User data with authentication tokens
   */
  const loginUser = async (user) => {
    const response = await axiosInstance.post("/users/login", user);
    return response.data;
  };

  /**
   * @desc Authenticates email
   * @returns User data with authentication tokens
   */
  const verifyEmail = async (token) => {
    const response = await axiosInstance.post(
      `/users/verify-email?token=${token}`
    );
    return response.data;
  };

  return {
    ...baseService,
    registerUser,
    loginUser,
    verifyEmail,
  };
};
