import { Context, Next } from 'koa';
import AuthorizationService from 'src/services/authorization';

export default class AuthorizationMiddleware {
  private authorizationService: AuthorizationService = new AuthorizationService();

  constructor() {
    this.authorize = this.authorize.bind(this);
  }

  authorize(ctx: Context, next: Next): void {
    const { header } = ctx;

    if (!header || !header.authorization) {
      ctx.throw(401, 'Authorization header not found');
    }

    const authorizationParts: Array<string> = header.authorization
      .trim()
      .split(' ');

    if (authorizationParts.length < 2) {
      ctx.throw(401, 'Invalid Authorization header format');
    }

    try {
      this.authorizationService.decodeToken(authorizationParts[1]);
      next();
    } catch (e) {
      ctx.throw(401, e.message);
    }
  }
}
