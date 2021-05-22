import { ApiResult } from './apiResult';

declare global {
  namespace Express {
    interface User {
      /**
       * The user's ID in the DB.
       * Injected during authentication.
       */
      id: string;
    }

    interface Response {
      /**
       * Returns the specified API result as a JSON result.
       * Using this method in favor of `json` is prefered since it enforces correct result typing.
       * @param result The API result to be returned.
       */
      apiResult<T>(result: ApiResult<T>): Response;
    }
  }
}

export {};
