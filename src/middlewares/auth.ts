import { Context, Next } from 'koa';
import AuthService from 'src/services/auth';
import AuthValidator from 'src/validators/auth';

export default class AuthMiddleware {
  private authService: AuthService;
  private authValidator: AuthValidator;

  constructor(authService: AuthService, authValidator: AuthValidator) {
    this.authService = authService;
    this.authValidator = authValidator;
    this.authorize = this.authorize.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
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
      this.authService.decodeToken(authorizationParts[1]);
    } catch (e) {
      ctx.throw(401, e.message);
    }

    await next();
  }

  async validateLogin(ctx: Context, next: Next): Promise<void> {
    try {
      this.authValidator.validateLogin(ctx.request.body);
    } catch (e) {
      ctx.throw(400, e.message);
    }

    await next();
  }
}
