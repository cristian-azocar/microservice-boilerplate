import Router from 'koa-router';
import { Middleware } from 'koa';
import HealthController from '../controllers/health';

export default class HealthRouter {
  router: Router = new Router();
  controller: HealthController = new HealthController();

  constructor() {
    this.buildRoutes();
  }

  private buildRoutes(): void {
    const { router, controller } = this;

    router.get('/health', controller.getHealthInfo.bind(controller));
  }

  getRoutes(): Middleware {
    return this.router.routes();
  }
}
