import { RequestHandler } from 'express';
import { BaseSchema, ValidationError } from 'yup';
import { BadRequestError } from '../errors/apiErrors';
import { asyncRequestHandler } from '../utils/asyncRequestHandler';

const baseValidationErrorMessage = `Validation failed. The request body had an invalid format.`;

/**
 * A middleware for validating request bodys using the `yup` library.
 * On failed validation, responds with a Bad Request error composed of the validation errors.
 * @param schema The `yup` schema instance to be used for validation.‚
 */
export function validateRequestBody(schema: BaseSchema): RequestHandler {
  return asyncRequestHandler(async (req, _res, next) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      req.body = schema.cast(req.body, { stripUnknown: true });
      next();
    } catch (e) {
      if (e instanceof ValidationError) {
        throw new BadRequestError(baseValidationErrorMessage + ` Errors: ${formatErrorsForMessage(e.errors)}`);
      } else {
        throw new BadRequestError(baseValidationErrorMessage);
      }
    }
  });
}

function formatErrorsForMessage(errors: Array<string>) {
  const errorsWithDots = errors.map((e) => (e.endsWith('.') ? e : e + '.'));
  return errorsWithDots.join(' ');
}
