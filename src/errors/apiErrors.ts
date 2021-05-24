export class ApiError extends Error {
  constructor(public statusCode: number, message?: string) {
    super(message);
  }
}

export class BadRequestError extends ApiError {
  constructor(message = 'Invalid request data.') {
    super(400, message);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized.') {
    super(401, message);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = 'Access to this resource is forbidden.') {
    super(403, message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'The requested resource was not found.') {
    super(404, message);
  }
}
