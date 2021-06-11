import { Request } from 'express';
import { PaginationOptions } from '../db/plugins/pagination';
import { UnauthorizedError } from '../dtos/apiErrors';
import { SortableFields, parseMongooseSortQuery } from './parseMongooseSortQuery';

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
  const requestedPage = ~~+(req.query.page ?? '');
  const requestedPageSize = ~~+(req.query.pageSize ?? '');
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

/**
 * Transforms the `sort` query parameter to a mongoose sort query object.
 * For this to work, the `sort` query parameter must follow the established format used by the API
 *
 * Examples:
 * * `?sort=foo`
 * * `?sort=foo:asc`
 * * `?sort=foo:desc`
 * * `?sort=foo:asc,bar:desc`
 * @param sortableFields An array of the fields which are allowed to be present in the generated sort query.
 */
export function getSortQueryFromUrl<T>(req: Request, sortableFields: Array<SortableFields<T>>) {
  const sort = req.query.sort?.toString() ?? '';
  return sort ? parseMongooseSortQuery(sort, sortableFields) : undefined;
}

/**
 * Attempts to read and convert a query parameter of a given name to a {@link Date}.
 * @param req The request.
 * @param name The name of the query parameter which should be converted to a date.
 * @returns The parsed {@link Date} or `undefined` if there was no parsable parameter.
 */
export function getDateQueryParam(req: Request, name: string) {
  const value = req.query[name]?.toString() ?? '';
  const date = Date.parse(value);
  return isNaN(date) ? undefined : new Date(date);
}
