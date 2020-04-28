import { Middleware, Context } from 'koa';
import ApiDocsUtils from 'src/utils/api-docs';

const koaSwagger = (): Middleware => {
  return (ctx: Context): void => {
    ctx.status = 200;
    ctx.type = 'text/html';
    ctx.body = '<html></html>';
  };
};

function ApiDocsUtilsMock(): Partial<ApiDocsUtils> {
  return {
    getSwaggerMiddleware: async (): Promise<Middleware> => {
      await Promise.resolve();
      return koaSwagger();
    },
  };
}

jest.mock('src/utils/api-docs', () => ApiDocsUtilsMock);
