import { ErrorRequestHandler } from 'express';
import { STATUS_CODES } from 'http';
import { ApiError } from '../errors/apiErrors';
import { logger } from '../log';

export const apiErrorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const statusCode = err?.statusCode ?? 500;
  const status = STATUS_CODES[statusCode] ?? statusCode.toString();
  const message = err?.message ?? `${statusCode} ${status}: ${err}`;
  const result = {
    statusCode,
    status,
    message,
  };

  if (err instanceof ApiError) {
    logger.info(`[Server] ApiError thrown.`, result);
  } else {
    logger.error(`[Server] Unhandled error thrown. Stack: ${err?.stack}`, result);
  }

  return res.status(statusCode).json(result);
};
