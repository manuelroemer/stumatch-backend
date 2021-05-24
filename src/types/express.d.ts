import { ApiResult, PaginationApiResult } from './apiResult';
import { User as AppUser } from '../db/models/user';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends AppUser {}

    interface Response {
      /**
       * Returns the specified API result as a JSON result.
       * Using this method in favor of `json` is prefered since it enforces correct result typing.
       * @param result The API result to be returned.
       */
      apiResult<T>(result: ApiResult<T> | PaginationApiResult<T>): Response;
    }
  }
}

export {};
