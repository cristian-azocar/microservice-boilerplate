import { Context } from 'koa';
import LoginController from 'src/controllers/login';
import LoginResponse from 'src/models/responses/login';
import users from 'tests/unit/fixtures/users';
import User from 'src/models/user';

function LoginControllerMock(): Partial<LoginController> {
  return {
    login: (ctx: Context): Promise<void> => {
      const { username, password } = ctx.request.body;
      const user: User = users.find(
        (u) => u.username === username && u.password === password
      );
      const response: LoginResponse = {
        username: user.username,
        name: user.name,
        email: user.email,
        creationDate: user.creationDate,
        token: '',
      };

      ctx.body = response;

      return Promise.resolve();
    },
  };
}

jest.mock('src/controllers/login', () => LoginControllerMock);
