import { useMutation } from "@tanstack/react-query";

import { createUserService } from "./userService";

import { toast } from "react-toastify";

const userService = createUserService();

/**
 * @desc Handles user registration
 * @returns mutation
 */
export const useRegisterUser = () => {
  return useMutation({
    mutationFn: userService.registerUser,
    onError: (error) => {
      const msg =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      toast.error(msg);
    },

    onSuccess: (response) => {
      const msg =
        response?.data?.message ||
        response?.message ||
        "Register Successfully!";
      toast.success(msg);
    },
  });
};

/**
 * @desc Handles user login and stores session
 * @returns mutation
 */
export const useLoginUser = () => {
  return useMutation({
    mutationFn: userService.loginUser,
    onError: (error) => {
      const msg =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      toast.error(msg);
    },

    onSuccess: (response) => {
      const msg =
        response?.data?.message || response.message || "Login SUccessful!";
      toast.success(msg);
    },
  });
};
