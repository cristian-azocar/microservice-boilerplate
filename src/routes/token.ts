import Router from 'koa-router';
import { Middleware } from 'koa';
import TokenController from 'src/controllers/token';

export default class TokenRouter {
  private router: Router = new Router();
  private controller: TokenController = new TokenController();

  constructor() {
    this.buildRoutes();
  }

  private buildRoutes(): void {
    const { router, controller } = this;

    router.post('/token/validate', controller.validate.bind(controller));
  }

  getRoutes(): Middleware {
    return this.router.routes();
  }
}
