import { Middleware, Context } from 'koa';

const koaSwagger: typeof jest = jest.mock('koa2-swagger-ui', () => ({
  __esModule: true,
  default: (): Middleware => {
    return (ctx: Context): void => {
      ctx.status = 200;
    };
  },
}));

export default koaSwagger;
