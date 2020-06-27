import { Context, Next } from 'koa';
import AuthMiddleware from 'src/middlewares/auth';

function AuthMiddlewareMock(): Partial<AuthMiddleware> {
  return {
    authorize: async (ctx: Context, next: Next): Promise<void> => {
      if (!ctx.header.authorization) {
        ctx.throw(401, 'Unauthorized');
      }

      next();
    },
  };
}

jest.mock('src/middlewares/auth', () => AuthMiddlewareMock);
