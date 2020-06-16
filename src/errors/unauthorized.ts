export default class UnauthorizedError extends Error {
  public code: number;
  public message: string;

  constructor(message: string) {
    super(message);

    this.code = 401;
    this.message = message;
  }
}
