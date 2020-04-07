import Router from 'koa-router';
import { ParameterizedContext } from 'koa';

export default class HealthRouter extends Router {
  constructor() {
    super();

    this.buildRoutes();
  }

  private buildRoutes(): void {
    this.get('/', (ctx: ParameterizedContext) => {
      ctx.body = {
        status: 'OK'
      }
    });
  }
}
