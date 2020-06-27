import { Middleware, Context, Next } from 'koa';
import Router from 'koa-router';
import ApiDocsUtils from 'src/utils/api-docs';

const router: Router = new Router();
const apiDocsUtils: ApiDocsUtils = new ApiDocsUtils();

router.get(
  '/docs',
  async (ctx: Context, next: Next): Promise<void> => {
    const swaggerMiddleware: Middleware = await apiDocsUtils.getSwaggerMiddleware();
    swaggerMiddleware(ctx, next);
  }
);

export default router;
