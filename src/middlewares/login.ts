import { Context, Next } from 'koa';
import LoginValidator from 'src/validators/login';
import ErrorResponse from 'src/models/responses/error';

export default class LoginMiddleware {
  loginValidator: LoginValidator = new LoginValidator();

  validateRequest(ctx: Context, next: Next): void {
    const { error } = this.loginValidator.validate(ctx.request.body);

    if (error) {
      ctx.status = 400;
      ctx.body = new ErrorResponse(ctx.status, error.message);
      return;
    }

    next();
  }
}
