import express from "express";
import {
  loginUser,
  registerUser,
  verifyEmail,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/verify-email").post(verifyEmail);

export default router;
