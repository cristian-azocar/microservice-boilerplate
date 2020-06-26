import { Context, Next } from 'koa';
import authService from 'src/services/auth';

class AuthMiddleware {
  constructor() {
    this.authorize = this.authorize.bind(this);
  }

  async authorize(ctx: Context, next: Next): Promise<void> {
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
      authService.decodeToken(authorizationParts[1]);
    } catch (e) {
      ctx.throw(401, e.message);
    }

    await next();
  }
}

export default new AuthMiddleware();
