export class NotFoundError extends Error {
  constructor(objectName) {
    super(`${objectName} Not Found`);
    this.statusCode = 404;
  }
}
