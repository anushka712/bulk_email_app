import asyncHandler from "express-async-handler";

import { User } from "../models/user.model.js";

import crypto from "crypto";

import { mailTransport } from "../configs/mailer.config.js";

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

  const verificationToken = crypto.randomBytes(32).toString("hex");

  const newUser = await User.create({
    name,
    email,
    phone,
    password,
    verificationToken,
  });

  const verificationLink = `http://localhost:5173/verify-email?token=${verificationToken}`;

  await mailTransport.sendMail({
    from: '"Your App" <no-reply@yourapp.com>',
    to: email,
    subject: "Verify Your Email",
    html: `
        <p>Hi ${name},</p>
        <p>Click the link below to verify your email:</p>
        <a href="${verificationLink}">Verify Email</a>
        <p>This link will expire in 24 hours.</p>
      `,
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

  if (!user.verified) {
    res.status(403);
    throw new Error("Email is not verified. Please check your inbox.");
  }

  if (!(await user?.matchPassword(password)))
    res.status(404).json({ message: "Password doesn't match" });

  res.status(200).json(user);
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.query;

  const user = await User.findOne({ verificationToken: token });
  if (!user) return res.status(400).send("Invalid or expired token");

  user.verified = true;
  user.verificationToken = null;
  await user.save();

  res
    .status(201)
    .json({ message: "Email verified successfully! You can now log in." });
});
