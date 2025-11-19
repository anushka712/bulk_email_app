import asyncHandler from "express-async-handler";

import { User } from "../models/user.model.js";

/**
 * @desc POST New User
 * @route "/users/register"
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exist");
  }

  const newUser = await User.create({
    name,
    email,
    phone,
    password,
  });

  res.status(200).json(newUser);
});

/**
 * @desc POST Login User
 * @route "/users/login"
 */
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found!");

  if (!(await user?.matchPassword(password)))
    throw new Error("Password doesn't match");

  res.status(200).json(user);
});
