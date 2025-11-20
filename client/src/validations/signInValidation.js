import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const initialValues = {
  email: "",
  password: "",
};

const signInSchema = z.object({
  email: z.string().email({ message: "Invalid Email Address." }),
  password: z
    .string()
    .min(6, { message: "Password should have at least 6 characters." }),
});

export const validateSignIn = zodResolver(signInSchema);
