import { HttpStatus } from "../constants/httpStatus.js";

// export const NOT_FOUND_HANDLER = (req, res, next) => {
//   const error = new Error(`Not Found: ${req.originalUrl}`);

//   res.status(404);

//   next(error);
// };

const errorMiddleware = (error, req, res, next) => {
  let errorMessage = error?.message;

  let statusCode = error?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;

  const __handleDuplicateErrorMessage = () => {
    errorMessage = `Document with field(s) ${Object.keys(error?.keyValue)
      .map((val) => `"${val}"`)
      .join(", ")} already exists!`;

    // Bad Request
    statusCode = HttpStatus.BAD_REQUEST;
  };

  const __handleRequiredErrorMessage = () => {
    const _errorObj = error?.errors;

    if (!_errorObj) return;

    const _requiredFields = Object.keys(_errorObj).filter(
      (key) => _errorObj[key] && _errorObj[key]?.kind === "required"
    );

    if (!_requiredFields?.length) return;

    const _missingFieldsErrorMessage = `Missing required fields: ${_requiredFields?.join(
      ", "
    )}`;

    errorMessage = _missingFieldsErrorMessage;

    statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
  };

  const __handleMiscErrorMessages = () => {
    __handleRequiredErrorMessage();
  };

  switch (error?.code) {
    case 11000:
      __handleDuplicateErrorMessage();
      break;

    default:
      __handleMiscErrorMessages();
      break;
  }

  res.status(statusCode).json({
    message: errorMessage,
    ...(process.env.NODE_ENV !== "production" && { stack: error.stack }),
  });

  next(error);
};

export default errorMiddleware;
