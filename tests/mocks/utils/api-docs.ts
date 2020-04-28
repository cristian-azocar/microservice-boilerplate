import { Middleware, Context } from 'koa';
import ApiDocsUtils from 'src/utils/api-docs';

const koaSwagger = (): Middleware => {
  return (ctx: Context): void => {
    ctx.status = 200;
    ctx.type = 'text/html';
    ctx.body = '<html></html>';
  };
};

jest.mock('src/utils/api-docs', () => {
  return function constructor(): Partial<ApiDocsUtils> {
    return {
      getSwaggerMiddleware: async (): Promise<Middleware> => {
        await Promise.resolve();
        return koaSwagger();
      },
    };
  };
});
