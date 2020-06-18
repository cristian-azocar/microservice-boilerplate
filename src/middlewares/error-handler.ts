import { Context, Next } from 'koa';
import ErrorResponse from 'src/models/responses/error';

class ErrorHandlerMiddleware {
  async handleErrors(ctx: Context, next: Next): Promise<void> {
    try {
      await next();
    } catch (e) {
      const status: number = e.code || e.status || 500;
      const message: string = e.message || 'Internal Server Error';

      if (status === 500) {
        // eslint-disable-next-line no-console
        console.error(e);
      }

      ctx.status = status;
      ctx.body = new ErrorResponse(status, message);
    }
  }
}

export default new ErrorHandlerMiddleware();
