import { Request, Response } from 'express';
import AuthService from '../../services/AuthService';

export default class AuthController {
  private authService: AuthService = new AuthService();

  constructor() {
    this.login = this.login.bind(this);
  }

  async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    const loginResult = await this.authService.login(username, password);

    res.json(loginResult);
  }
}
