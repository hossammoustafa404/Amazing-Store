import { StatusCodes } from "http-status-codes";
import config from "../config/config";
import type { Response, Request, NextFunction } from "express";
import { AppError } from "../lib/errors";
import { QueryFailedError } from "typeorm";

const sendDevError = (
  err: {
    status: number;
    statusText: string;
    message: string;
    stack: string;
    error: AppError | QueryFailedError;
  },
  res: Response
) =>
  res.status(err.status).json({
    statusText: err.statusText,
    message: err.message,
    stack: err.stack,
    error: err,
  });

const sendProdError = (
  err: {
    status: number;
    statusText: string;
    message: string;
    stack: string;
    error: AppError | QueryFailedError;
  },
  res: Response
) => {
  return res.status(err.status).json({
    statusText: err.statusText,
    message: err.message,
  });
};
const errorHandler = (
  err: AppError | QueryFailedError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errObj = {
    message: "Something went wrong",
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    statusText: "Error",
    stack: err.stack,
    error: err,
  };

  if (err instanceof AppError) {
    errObj.message = err.message;
    errObj.status = err.status;
    errObj.statusText = err.statusText;
    errObj.stack = err.stack;
  }

  if (err instanceof QueryFailedError) {
    if (err.driverError.code === "23505") {
      errObj.message = err.driverError.detail;
      errObj.status = StatusCodes.CONFLICT;
      errObj.statusText = "Fail";
      errObj.stack = err.stack;
    }
  }

  if (config.app.env === "development") {
    sendDevError(errObj, res);
  } else if (config.app.env === "production") {
    sendProdError(errObj, res);
  }
};

export default errorHandler;
