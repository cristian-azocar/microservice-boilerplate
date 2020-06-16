import { Context, Next } from 'koa';
import AuthorizationMiddleware from 'src/middlewares/authorization';
import ErrorResponse from 'src/models/responses/error';

function AuthorizationMiddlewareMock(): Partial<AuthorizationMiddleware> {
  return {
    authorize: (ctx: Context, next: Next): void => {
      if (!ctx.header.authorization) {
        ctx.throw(401, 'Unauthorized');
      }

      next();
    },
    handleErrors: async (ctx: Context, next: Next): Promise<void> => {
      try {
        await next();
      } catch (e) {
        if (e.status === 401) {
          ctx.status = 401;
          ctx.body = new ErrorResponse(401, e.message || 'Unauthorized');
          return;
        }

        throw e;
      }
    },
  };
}

jest.mock('src/middlewares/authorization', () => AuthorizationMiddlewareMock);
