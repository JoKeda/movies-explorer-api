class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.status = 500;
  }
}

class WrongDataError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class AlreadyExistsError extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}
class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.status = 403;
  }
}

module.exports = {
  NotFoundError,
  ServerError,
  UnauthorizedError,
  WrongDataError,
  AlreadyExistsError,
  ForbiddenError,
};
