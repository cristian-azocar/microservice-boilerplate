import { Context } from 'koa';
import userService from 'src/services/user';
import User from 'src/models/user';

export default class UserController {
  constructor() {
    this.getUserById = this.getUserById.bind(this);
  }

  async getUserById(ctx: Context): Promise<void> {
    const { id } = ctx.params;
    const user: User = await userService.findById(id);

    if (!user) {
      ctx.throw(404, `Could not found user with id ${id}`);
    }

    ctx.body = user;
  }
}
