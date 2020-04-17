import { Context } from 'koa';
import LoginController from 'src/controllers/login';

const getSpy = (): jest.SpyInstance =>
  jest
    .spyOn(LoginController.prototype, 'login')
    .mockImplementation((ctx: Context) => {
      ctx.body = {
        username: ctx.request.body.username,
        name: 'John',
        lastName: 'Doe',
        email: 'john.doe@fake.com',
        createdAt: new Date(),
      };

      return Promise.resolve();
    });

export default {
  getSpy,
};
