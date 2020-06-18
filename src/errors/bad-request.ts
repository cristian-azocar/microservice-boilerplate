export default class BadRequestError extends Error {
  public code: number;
  public message: string;

  constructor(message: string) {
    super(message);

    this.code = 400;
    this.message = message;
  }
}
