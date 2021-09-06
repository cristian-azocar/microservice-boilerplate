import { Request, Response } from 'express';
import AuthService from '../../services/AuthService';

export default class AuthController {
  private authService: AuthService = new AuthService();

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    const loginResult = await this.authService.login(username, password);

    res.json(loginResult);
  }

  async logout(req: Request, res: Response): Promise<void> {
    await this.authService.logout();
    res.status(200).send();
  }
}
