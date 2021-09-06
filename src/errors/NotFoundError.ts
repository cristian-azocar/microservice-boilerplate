export default class NotFoundError extends Error {
  public code: number;

  constructor(message: string) {
    super(message);

    this.code = 404;
    this.message = message;
  }
}
