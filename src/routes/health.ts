import Router from 'koa-router';
import { Middleware } from 'koa';
import HealthController from 'src/controllers/health';

function getRoutes(healthController: HealthController): Middleware {
  const router: Router = new Router();

  router.get('/health', healthController.getHealthInfo);

  return router.routes();
}

export default getRoutes;
