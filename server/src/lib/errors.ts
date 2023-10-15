import { StatusCodes } from "http-status-codes";

// App Error
export class AppError extends Error {
  statusText: string;
  constructor(message: string, public status: number) {
    super(message);
    this.statusText = `${this.status}`.startsWith("4") ? "Fail" : "Error";

    Error.captureStackTrace(this, this.constructor);
  }
}

// Not Found Error
export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

// Bad Request Error
export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

// UnAuthorized Error
export class UnAuthorizedError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

// Forbidden Error
export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN);
  }
}
