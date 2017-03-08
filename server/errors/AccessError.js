class AccessError extends Error {
  constructor(message) {
    super(message);

    this.name = "AccessError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AccessError);
    } else {
      this.stack = (new Error()).stack;
    }
  }
}

module.exports = AccessError;
