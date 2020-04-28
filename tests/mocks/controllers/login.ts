import { Context } from 'koa';
import LoginController from 'src/controllers/login';

function LoginControllerMock(): Partial<LoginController> {
  return {
    login: (ctx: Context): Promise<void> => {
      ctx.body = {
        username: ctx.request.body.username,
        name: 'John',
        lastName: 'Doe',
        email: 'john.doe@fake.com',
        createdAt: new Date(),
      };

      return Promise.resolve();
    },
  };
}

jest.mock('src/controllers/login', () => LoginControllerMock);
