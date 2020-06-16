import { Context } from 'koa';
import UserService from 'src/services/user';

export default class UserController {
  userService: UserService = new UserService();

  constructor() {
    this.login = this.login.bind(this);
  }

  async login(ctx: Context): Promise<void> {
    const { username, password } = ctx.request.body;

    ctx.body = await this.userService.login(username, password);
  }
}
