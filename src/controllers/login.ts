import { Context } from 'koa';
import LoginService from 'src/services/login';
import LoginResponse from 'src/models/responses/login';
import ErrorResponse from 'src/models/responses/error';

export default class LoginController {
  loginService: LoginService = new LoginService();

  async login(ctx: Context): Promise<void> {
    const { username, password } = ctx.request.body;
    const loginResponse: LoginResponse = await this.loginService.login(
      username,
      password
    );

    if (!loginResponse) {
      ctx.status = 401;
      ctx.body = new ErrorResponse(
        ctx.status,
        'Username or password incorrect'
      );
      return;
    }

    ctx.body = loginResponse;
  }
}
