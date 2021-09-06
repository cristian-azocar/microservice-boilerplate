import { Request, Response, NextFunction } from 'express';
import UnauthorizedError from '../../errors/UnauthorizedError';
import AuthService from '../../services/AuthService';

export default class AuthMiddleware {
  private authService: AuthService = new AuthService();

  constructor() {
    this.authorize = this.authorize.bind(this);
  }

  async authorize(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { headers } = req;

    if (!headers?.authorization) {
      throw new UnauthorizedError('Authorization header not found');
    }

    const authorizationParts: Array<string> = headers.authorization
      .trim()
      .split(' ');

    if (authorizationParts.length < 2) {
      throw new UnauthorizedError('Invalid Authorization header format');
    }

    try {
      this.authService.decodeToken(authorizationParts[1]);
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      throw new UnauthorizedError(message);
    }

    await next();
  }
}
