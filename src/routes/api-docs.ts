import { Middleware, Context, Next } from 'koa';
import Router from 'koa-router';
import ApiDocsUtils from 'src/utils/api-docs';

function getRoutes(apiDocsUtils: ApiDocsUtils): Middleware {
  const router: Router = new Router();

  router.get(
    '/docs',
    async (ctx: Context, next: Next): Promise<void> => {
      const swaggerMiddleware: Middleware = await apiDocsUtils.getSwaggerMiddleware();
      swaggerMiddleware(ctx, next);
    }
  );

  return router.routes();
}

export default getRoutes;
