export function errorLogger(error, req, res, next) {
  // for logging errors
  console.error(error); // or using any fancy logging library
  next(error); // forward to next middleware
}
