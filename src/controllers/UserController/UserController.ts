import { Request, Response } from 'express';
import UserService from '../../services/UserService';
import NotFoundError from '../../errors/NotFoundError';

export default class UserController {
  private userService: UserService = new UserService();

  constructor() {
    this.getUserById = this.getUserById.bind(this);
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const user = await this.userService.findById(+id);

    if (!user) {
      throw new NotFoundError(`Could not found user with id ${id}`);
    }

    res.json(user);
  }
}
