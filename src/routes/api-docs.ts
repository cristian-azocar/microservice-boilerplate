import { Middleware, Context, Next } from 'koa';
import Router from 'koa-router';
import apiDocsUtils from 'src/utils/api-docs';

const router: Router = new Router();

router.get(
  '/docs',
  async (ctx: Context, next: Next): Promise<void> => {
    const swaggerMiddleware: Middleware = await apiDocsUtils.getSwaggerMiddleware();
    swaggerMiddleware(ctx, next);
  }
);

export default router;
