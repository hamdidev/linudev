// const ErrorHandler = (statusCode, message) => {
//   const error = new Error();
//   error.statusCode = statusCode;
//   error.message = message;
//   return error;
// };

// export default ErrorHandler;

const ErrorHandler = (statusCode = 500, message = "Internal Server Error") => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export default ErrorHandler;
