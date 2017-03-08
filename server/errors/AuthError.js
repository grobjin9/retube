class AuthError extends Error {
  constructor(message) {
    super(message);

    this.name = "AuthError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthError);
    } else {
      this.stack = (new Error()).stack;
    }
  }
}

module.exports = AuthError;