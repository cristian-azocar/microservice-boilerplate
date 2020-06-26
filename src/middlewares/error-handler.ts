import { Context, Next } from 'koa';
import ErrorResponse from 'src/models/responses/error';

async function errorHandlerMiddleware(ctx: Context, next: Next): Promise<void> {
  try {
    await next();
  } catch (e) {
    const status: number = e.code || e.status || 500;

    if (status === 500) {
      // eslint-disable-next-line no-console
      console.error(e);
    }

    ctx.status = status;
    ctx.body = new ErrorResponse(status, e.message);
  }
}

export default errorHandlerMiddleware;
