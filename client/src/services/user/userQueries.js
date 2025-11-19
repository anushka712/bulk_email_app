import { useMutation } from "@tanstack/react-query";

import { createUserService } from "./userService";

const userService = createUserService();

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: userService.registerUser,
  });
};
