class UndefinedResourceError extends Error {
  constructor(message) {
    super(message);

    this.name = "UndefinedResourceError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthError);
    } else {
      this.stack = (new Error()).stack;
    }
  }
}

module.exports = UndefinedResourceError;