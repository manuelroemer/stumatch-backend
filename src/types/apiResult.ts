/**
 * Defines the body of a typical API result returned by the server's REST endpoints.
 * Wraps a type `T` in a bag object to allow progressive enhancement with metadata.
 */
export interface ApiResult<T> {
  /**
   * The actual result returned by the API.
   */
  result: T;
}
