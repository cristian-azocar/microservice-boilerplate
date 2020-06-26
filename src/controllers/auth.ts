import { Context } from 'koa';
import authService from 'src/services/auth';

export default class AuthController {
  constructor() {
    this.login = this.login.bind(this);
  }

  async login(ctx: Context): Promise<void> {
    const { username, password } = ctx.request.body;

    ctx.body = await authService.login(username, password);
  }
}
