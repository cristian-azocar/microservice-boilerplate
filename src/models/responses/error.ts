export default class ErrorResponse {
  code: number;
  message: string;

  constructor(code: number, message?: string) {
    this.code = code || 500;
    this.message = message || 'Internal Server Error';
  }
}
