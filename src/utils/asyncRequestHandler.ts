import { RequestHandler } from 'express';

/**
 * Wraps the given inner request handler such that it fully works asynchronous.
 * Without wrapping, express does not catch errors in an otherwise asynchronous request handler.
 * @param innerHandler The inner handler to be wrapped.
 * @returns A request handler which fully supports async functions.
 */
export function asyncRequestHandler(innerHandler: RequestHandler) {
  const handler: RequestHandler = async (req, res, next) => {
    try {
      return await innerHandler(req, res, next);
    } catch (e) {
      next(e);
    }
  };

  return handler;
}
