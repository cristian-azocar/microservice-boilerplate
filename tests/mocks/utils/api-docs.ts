import { Middleware, Context } from 'koa';
import ApiDocsUtils from 'src/utils/api-docs';

const koaSwagger = (): Middleware => {
  return (ctx: Context): void => {
    ctx.status = 200;
    ctx.type = 'text/html';
    ctx.body = '<html></html>';
  };
};

const spyOn: any = {
  getSwaggerMiddleware: (): jest.SpyInstance =>
    jest
      .spyOn(ApiDocsUtils.prototype, 'getSwaggerMiddleware')
      .mockImplementation(
        async (): Promise<Middleware> => {
          await Promise.resolve();
          return koaSwagger();
        }
      ),
};

export default {
  spyOn,
};
