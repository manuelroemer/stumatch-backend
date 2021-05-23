import { Express, Request } from 'express';

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
}
