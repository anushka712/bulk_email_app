import asyncHandler from "express-async-handler";

import { HttpStatus } from "../constants/httpStatus.js";

/**
 * Middleware to authenticate a user based on the JWT token provided in the Authorization header.
 * If the token is valid, the user information is attached to the request object.
 * If the token is invalid or not provided, an error is thrown with an appropriate status code.
 */
export const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.header("Authorization") &&
    req.header("Authorization").startsWith("Bearer")
  ) {
    try {
      token = req.header("Authorization").split(",")[0].split(" ")[1];

      next();
    } catch (error) {
      throw Object.assign("Not Authorized, Invalid token!", {
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }
  }

  if (!token)
    throw Object.assign("Not Authorized, No token found!", {
      statusCode: HttpStatus.UNAUTHORIZED,
    });
});
