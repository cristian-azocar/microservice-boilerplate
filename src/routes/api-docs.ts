import { Middleware, Context, Next } from 'koa';
import Router from 'koa-router';
import ApiDocsUtils from 'src/utils/api-docs';

export default class ApiDocsRouter {
  router: Router = new Router();
  apiDocsUtils: ApiDocsUtils = new ApiDocsUtils();

  constructor() {
    this.buildRoutes();
  }

  private buildRoutes(): void {
    const { router, apiDocsUtils } = this;

    router.get(
      '/docs',
      async (ctx: Context, next: Next): Promise<void> => {
        const swaggerMiddleware: Middleware = await apiDocsUtils.getSwaggerMiddleware();
        swaggerMiddleware(ctx, next);
      }
    );
  }

  getRoutes(): Middleware {
    return this.router.routes();
  }
}
