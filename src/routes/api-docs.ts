import { Middleware } from 'koa';
import Router from 'koa-router';
import ApiDocsUtils from 'src/utils/api-docs';

export default class ApiDocs {
  router: Router = new Router();
  apiDocsUtils: ApiDocsUtils = new ApiDocsUtils();

  constructor() {
    this.buildRoutes();
  }

  private async buildRoutes(): Promise<void> {
    const { router, apiDocsUtils } = this;
    const swaggerMiddleware: Middleware = await apiDocsUtils.getSwaggerMiddleware();

    router.get('/docs', swaggerMiddleware);
  }

  getRoutes(): Middleware {
    return this.router.routes();
  }
}
