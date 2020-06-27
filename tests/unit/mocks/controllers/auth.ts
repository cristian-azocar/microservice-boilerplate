import { Context } from 'koa';
import AuthController from 'src/controllers/auth';
import LoginResponse from 'src/models/responses/login';
import users from 'tests/unit/fixtures/users';
import User from 'src/models/user';

function AuthControllerMock(): Partial<AuthController> {
  return {
    login: async (ctx: Context): Promise<void> => {
      const { username, password } = ctx.request.body;
      const user: User = users.find(
        (u) => u.username === username && u.password === password
      );

      if (!user) {
        ctx.status = 401;
        ctx.body = { code: 401, message: 'Incorrect username or password' };
        return;
      }

      const response: LoginResponse = {
        username: user.username,
        name: user.name,
        email: user.email,
        creationDate: user.creationDate,
        token: '',
      };

      ctx.body = response;
    },
  };
}

jest.mock('src/controllers/auth', () => AuthControllerMock);
