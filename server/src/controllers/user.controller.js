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
    res.status(404);
    throw new Error("User already exists");
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

  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  if (!(await user?.matchPassword(password)))
    res.status(404).json({ message: "Password doesn't match" });

  res.status(200).json(user);
});
