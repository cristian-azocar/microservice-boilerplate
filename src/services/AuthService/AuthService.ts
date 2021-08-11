import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import LoginResult from '../../models/LoginResult';
import UnauthorizedError from '../../errors/UnauthorizedError';
import UserService from '../UserService';

export default class AuthService {
  private userService: UserService = new UserService();
  private secret: Secret = process.env.JWT_SECRET || '';
  private oneDayInSeconds = 86400;
  private options: SignOptions = { expiresIn: this.oneDayInSeconds };

  async login(username: string, password: string): Promise<LoginResult> {
    const user = await this.userService.findByUsernameAndPassword(
      username,
      password
    );

    if (!user) {
      throw new UnauthorizedError('Incorrect username or password');
    }

    const payload: Record<string, unknown> = { username: user.username };
    const token: string = this.createToken(payload);

    return {
      username: user.username,
      name: user.name,
      email: user.email,
      creationDate: user.creationDate,
      token,
    };
  }

  async logout(): Promise<void> {
    // TODO: logout user
  }

  createToken(payload: string | Record<string, unknown> | Buffer): string {
    return jwt.sign(payload, this.secret, this.options);
  }

  decodeToken(token: string): string | Record<string, unknown> {
    return jwt.verify(token, this.secret);
  }
}
