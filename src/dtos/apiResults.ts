/**
 * Defines the basic body of a typical API result returned by the server's REST endpoints.
 * Wraps a type `T` in a bag object to allow progressive enhancement with metadata.
 */
export interface ApiResult<T> {
  result: T;
}

/**
 * Enhances the default API result format with metadata about paginated endpoints.
 */
export interface PaginationApiResult<T> extends ApiResult<Array<T>> {
  totalCount: number;
  pages: number;
  page: number;
  pageSize: number;
}

/**
 * Enhances the default API result format with metadata about cursor pagination.
 */
export interface CursorPaginationApiResult<T> extends ApiResult<Array<T>> {
  pageSize: number;
  cursor: unknown;
  nextCursor: unknown;
}

// Explanation for the below functions:
// To ensure type safety for our API results (i.e. to ensure that *every* object returned by our
// API has one of the above interfaces), we explicitly pass every kind of result through one of
// the below functions which creates an object with the correct interface.
// The functions are implemented such that they:
// a) don't return too much data (the reason why we *explicitly* declare what to return in favor
//    of using ....spread).
// b) don't return too little data (ensured via TS).

export function apiResult<T>(result: T): ApiResult<T> {
  return { result };
}

export function paginationApiResult<T>(
  result: Array<T>,
  metadata: Omit<PaginationApiResult<T>, 'result'>,
): PaginationApiResult<T> {
  return {
    ...apiResult(result),
    totalCount: metadata.totalCount,
    pages: metadata.pages,
    page: metadata.page,
    pageSize: metadata.pageSize,
  };
}

export function cursorPaginationApiResult<T>(result: Array<T>, metadata: Omit<CursorPaginationApiResult<T>, 'result'>) {
  return {
    ...apiResult(result),
    totalCount: metadata.totalCount,
    pageSize: metadata.pageSize,
    cursor: metadata.cursor,
    nextCursor: metadata.nextCursor,
  };
}
