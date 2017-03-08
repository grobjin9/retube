class DuplicationError extends Error {
  constructor(message) {
    super(message);

    this.name = "DuplicationError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthError);
    } else {
      this.stack = (new Error()).stack;
    }
  }
}

module.exports = DuplicationError;