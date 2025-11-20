import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const initialValues = {
  name: "",
  email: "",
  password: "",
  phone: "",
  confirmPassword: "",
};

const signUpSchema = z
  .object({
    phone: z.string().nonempty("Phone Number is Required!"),
    name: z.string().min(3, { message: "Name must be at least 3 characters." }),
    email: z.string().email({ message: "Invalid Email Address." }),
    password: z
      .string()
      .min(6, { message: "Password should have at least 6 characters." }),
    confirmPassword: z.string({
      required_error: "Confirm Password is Required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and Confirm Password do not match",
    path: ["confirmPassword"],
  });

export const validateSignUp = zodResolver(signUpSchema);
