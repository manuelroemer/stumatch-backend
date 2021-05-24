import { Request } from 'express';
import { PaginationOptions } from '../db/plugins/pagination';

/**
 * Returns the request's `user` or throws if no user is set.
 */
export function getUserOrThrow(req: Request) {
  if (!req.user) {
    throw new Error('No user is authenticated at this point in time.');
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
