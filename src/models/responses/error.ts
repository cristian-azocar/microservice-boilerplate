export default class ErrorResponse {
  public code: number;
  public message: string;

  constructor(code: number, message: string) {
    this.code = code || 500;
    this.message = message || 'Internal Server Error';
  }
}
