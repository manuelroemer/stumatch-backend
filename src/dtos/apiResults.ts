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

export function apiResult<T>(result: T): ApiResult<T> {
  return { result };
}

export function paginationApiResult<T>(
  result: Array<T>,
  metadata: Omit<PaginationApiResult<T>, 'result'>,
): PaginationApiResult<T> {
  return {
    result,
    totalCount: metadata.totalCount,
    pages: metadata.pages,
    page: metadata.page,
    pageSize: metadata.pageSize,
  };
}
