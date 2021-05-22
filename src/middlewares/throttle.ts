import { RequestHandler } from 'express';
import { logger } from '../log';

/**
 * Middleware intended for debugging.
 * When applied to an endpoint, throttles requests to that endpoint by a specific duration.
 * This can be used for testing specific parts of the frontend, e.g. loading animations etc.
 * @param msDelay The delay in milliseconds.
 */
export function throttle(msDelay = 2000): RequestHandler {
  logger.warn(`Throttling request by ${msDelay} msecs. This should only be used during development.`);
  return (_req, _res, next) => setTimeout(() => next(), msDelay);
}
