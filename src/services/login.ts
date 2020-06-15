import LoginResponse from 'src/models/responses/login';
import AuthorizationService from 'src/services/authorization';
import UserService from 'src/services/user';
import User from 'src/models/user';

export default class LoginService {
  authorizationService: AuthorizationService = new AuthorizationService();
  userService: UserService = new UserService();

  async login(username: string, password: string): Promise<LoginResponse> {
    const user: User = this.userService.getUserByCredentials(
      username,
      password
    );

    if (!user) {
      return null;
    }

    const payload: object = { username: user.username };
    const token: string = this.authorizationService.createToken(payload);

    return {
      username: user.username,
      name: user.name,
      email: user.email,
      creationDate: user.creationDate,
      token,
    };
  }
}
