import { Context } from 'koa';
import UserService from 'src/services/user';
import User from 'src/models/user';

export default class UserController {
  private userService: UserService = new UserService();

  constructor() {
    this.getUserById = this.getUserById.bind(this);
  }

  async getUserById(ctx: Context): Promise<void> {
    const { id } = ctx.params;
    const user: User = await this.userService.findById(id);

    if (!user) {
      ctx.throw(404, `Could not found user with id ${id}`);
    }

    ctx.body = user;
  }
}
