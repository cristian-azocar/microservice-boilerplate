import Router from 'koa-router';
import { Middleware } from 'koa';
import UserController from 'src/controllers/user';
import LoginMiddleware from 'src/middlewares/login';

export default class LoginRouter {
  router: Router = new Router();
  controller: UserController = new UserController();
  middleware: LoginMiddleware = new LoginMiddleware();

  constructor() {
    this.buildRoutes();
  }

  private buildRoutes(): void {
    const { router, controller, middleware } = this;

    router.post('/login', middleware.validateRequest, controller.login);
  }

  getRoutes(): Middleware {
    return this.router.routes();
  }
}
