export function errorResponder(error, req, res, next) {
  // responding to client
  // Error handling middleware functionality
  console.log(`error : ${error.message}`); // log the error
  const status = error.status || 400;
  // send back an easily understandable error message to the caller
  res.status(status).send(error.message);
}
