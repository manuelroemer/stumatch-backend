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

export class NotFoundError extends ApiError {
  constructor(message = 'The requested entity was not found.') {
    super(404, message);
  }
}
