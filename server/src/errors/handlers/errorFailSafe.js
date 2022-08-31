export function failSafeHandler(error, req, res, next) {
  // generic handler
  res.status(500).send(error);
}
