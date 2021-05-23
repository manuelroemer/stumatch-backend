import { ApiResult, PaginationApiResult } from './apiResult';
import { User as AppUser } from '../db/models/user';
import { PaginationOptions } from '../db/plugins/pagination';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends AppUser {}

    interface Request {
      /**
       * Returns the request's `user` or throws if no user is set.
       */
      getUserOrThrow(): User;
      /**
       * Parses pagination options from the request's query parameters.
       */
      getPaginationOptions(): PaginationOptions;
    }

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
