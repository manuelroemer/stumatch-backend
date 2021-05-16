export class ApiError extends Error {
  constructor(public statusCode: number, message?: string) {
    super(message);
  }
}

export class BadRequestError extends ApiError {
  constructor(message?: string) {
    super(400, message);
  }
}
