import { RequestHandler } from 'express';
import { BadRequestError } from '../errors/apiErrors';
import { asyncRequestHandler } from '../utils/asyncRequestHandler';

export function validateBodyIdMatchesPathId(bodyIdName = 'id', pathIdName = 'id'): RequestHandler {
  return asyncRequestHandler((req, _res, next) => {
    const bodyId = req.body[bodyIdName];
    const pathId = req.params[pathIdName];

    if (bodyId && bodyId !== pathId) {
      throw new BadRequestError(
        `The ID specified in the body (${bodyId}) does not match the ID specified in the path (${pathId}). If you specify an ID in the body, ensure that it matches the ID in the path.`,
      );
    }

    next();
  });
}
