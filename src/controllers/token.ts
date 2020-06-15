import { Context } from 'koa';
import AuthorizationService from 'src/services/authorization';
import ErrorResponse from 'src/models/responses/error';

export default class TokenController {
  authorizationService: AuthorizationService = new AuthorizationService();

  validate(ctx: Context): void {
    const { user } = ctx.state;

    try {
      this.authorizationService.decodeToken(user);
    } catch (e) {
      ctx.status = 401;
      ctx.body = new ErrorResponse(ctx.status, 'Invalid token');
    }
  }
}
