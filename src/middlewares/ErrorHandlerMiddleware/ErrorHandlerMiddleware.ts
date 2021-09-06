import { Request, Response, NextFunction } from 'express';

export default class ErrorHandlerMiddleware {
  handleErrors(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const status: number = err.code || err.status || 500;
    const message: string = err.message || 'Internal Server Error';

    if (status === 500) {
      // eslint-disable-next-line no-console
      console.error(err);
    }

    res.status(status);
    res.json({ code: status, message });
  }
}
