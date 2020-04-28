import { Middleware, Context } from 'koa';

jest.mock('koa2-swagger-ui', () => ({
  __esModule: true,
  default: (): Middleware => {
    return (ctx: Context): void => {
      ctx.status = 200;
    };
  },
}));
