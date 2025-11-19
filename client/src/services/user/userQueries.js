import { useMutation } from "@tanstack/react-query";

import { createUserService } from "./userService";

const userService = createUserService();

/**
 * @desc Handles user registration
 * @returns mutation
 */
export const useRegisterUser = () => {
  return useMutation({
    mutationFn: userService.registerUser,
  });
};

/**
 * @desc Handles user login and stores session
 * @returns mutation
 */
export const useLoginUser = () => {
  return useMutation({
    mutationFn: userService.loginUser,
  });
};
