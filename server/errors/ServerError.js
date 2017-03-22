class ServerError extends Error {
  constructor(message) {
    super(message);

    this.name = "ServerError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerError);
    } else {
      this.stack = (new Error()).stack;
    }
  }
}

module.exports = ServerError;