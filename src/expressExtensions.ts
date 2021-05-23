import { Express, Request } from 'express';
import { PaginationOptions } from './db/plugins/pagination';

/**
 * Extends an Express app with custom functions used by the server.
 * @param app The express app to be extended.
 */
export function extendExpress(app: Express) {
  app.response.apiResult = app.response.json;

  app.request.getUserOrThrow = function (this: Request) {
    if (!this.user) {
      throw new Error('No user is authenticated at this point in time.');
    }
    return this.user;
  };

  app.request.getPaginationOptions = function (this: Request): PaginationOptions {
    const requestedPage = +(this.query.page ?? '');
    const requestedPageSize = +(this.query.pageSize ?? '');
    const page = requestedPage >= 1 ? requestedPage : 1;
    const pageSize = requestedPageSize >= 1 ? requestedPageSize : 100;
    return {
      page,
      pageSize: Math.min(1000, pageSize),
    };
  };
}
