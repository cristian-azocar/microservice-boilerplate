import Router from 'koa-router';
import { Middleware, Context } from 'koa';

export default class ProtectedRouter {
  private router: Router = new Router();

  constructor() {
    this.buildRoutes();
  }

  private buildRoutes(): void {
    const { router } = this;

    router.get('/protected', (ctx: Context): void => {
      ctx.status = 200;
      ctx.body = {
        message:
          'This is a protected route. You can only see this if you are correctly authenticated.',
      };
    });
  }

  getRoutes(): Middleware {
    return this.router.routes();
  }
}
