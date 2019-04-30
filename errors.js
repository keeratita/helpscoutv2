class TokenExpired extends Error {
  constructor(resp) {
    // Calling parent constructor of base Error class.
    super('TokenExpired', 401);

    // Saving class name in the property of our custom error as a shortcut.
    this.name = 'TokenExpired';

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);

    this.response = resp;
  }
}

module.exports = {
  TokenExpired
};
