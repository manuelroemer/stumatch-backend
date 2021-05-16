import { ErrorRequestHandler } from 'express';
import { STATUS_CODES } from 'http';

export const apiErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err?.statusCode ?? 500;
  const status = STATUS_CODES[statusCode] ?? statusCode.toString();
  const message = err?.message ?? `${statusCode} ${status}: ${err}`;

  return res.status(statusCode).json({
    statusCode,
    status,
    message,
  });
};
