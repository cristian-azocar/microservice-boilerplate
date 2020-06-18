import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import nconf from 'nconf';
import LoginResponse from 'src/models/responses/login';
import UnauthorizedError from 'src/errors/unauthorized';
import UserService from 'src/services/user';
import User from 'src/models/user';

export default class AuthService {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  private secret: Secret = nconf.get('JWT_SECRET');
  private oneDayInSeconds = 86400;
  private options: SignOptions = { expiresIn: this.oneDayInSeconds };

  async login(username: string, password: string): Promise<LoginResponse> {
    const user: User = await this.userService.findByUsernameAndPassword(
      username,
      password
    );

    if (!user) {
      throw new UnauthorizedError('Incorrect username or password');
    }

    const payload: object = { username: user.username };
    const token: string = this.createToken(payload);

    return {
      username: user.username,
      name: user.name,
      email: user.email,
      creationDate: user.creationDate,
      token,
    };
  }

  createToken(payload: string | object | Buffer): string {
    return jwt.sign(payload, this.secret, this.options);
  }

  decodeToken(token: string): string | object {
    return jwt.verify(token, this.secret);
  }
}
