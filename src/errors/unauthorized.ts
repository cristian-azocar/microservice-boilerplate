export default class UnauthorizedError extends Error {
  public code: number;

  constructor(message: string) {
    super(message);

    this.code = 401;
    this.message = message;
  }
}
