import { Request } from 'express';
import { PaginationOptions } from '../db/plugins/pagination';
import { UnauthorizedError } from '../errors/apiErrors';

/**
 * Returns the request's `user` or throws if no user is set.
 */
export function getUserOrThrow(req: Request) {
  if (!req.user) {
    throw new UnauthorizedError();
  }
  return req.user;
}

/**
 * Parses pagination options from the request's query parameters.
 */
export function getPaginationOptions(req: Request): PaginationOptions {
  const requestedPage = +(req.query.page ?? '');
  const requestedPageSize = +(req.query.pageSize ?? '');
  const page = requestedPage >= 1 ? requestedPage : 1;
  const pageSize = requestedPageSize >= 1 ? requestedPageSize : 100;
  return {
    page,
    pageSize: Math.min(1000, pageSize),
  };
}

/**
 * Extracts the special user ID from the request's URL parameters.
 * Accepts the special "me" value (which is replaced with the user ID from the token).
 */
export function getUserId(req: Request, paramName = 'id'): string {
  const idInUrl = req.params[paramName];
  if (idInUrl === 'me') {
    return getUserOrThrow(req).id!;
  }
  return idInUrl;
}
