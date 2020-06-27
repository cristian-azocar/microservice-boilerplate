import { Context, Next } from 'koa';
import ErrorHandlerMiddleware from 'src/middlewares/error-handler';
import ErrorResponse from 'src/models/responses/error';

function ErrorHandlerMiddlewareMock(): Partial<ErrorHandlerMiddleware> {
  return {
    handleErrors: async (ctx: Context, next: Next): Promise<void> => {
      try {
        await next();
      } catch (e) {
        const status: number = e.code || e.status || 500;

        ctx.status = status;
        ctx.body = new ErrorResponse(status, e.message);
      }
    },
  };
}

jest.mock('src/middlewares/error-handler', () => ErrorHandlerMiddlewareMock);
