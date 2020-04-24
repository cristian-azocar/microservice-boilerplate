import { Context } from 'koa';
import { createMockContext } from '@shopify/jest-koa-mocks';
import LoginController from 'src/controllers/login';
import loginSchema from 'tests/schemas/login';
import loginServiceMock from 'tests/mocks/services/login';
import errorSchema from 'tests/schemas/error';

describe('login controller', (): void => {
  let spy: jest.SpyInstance;

  afterAll((): void => {
    spy.mockRestore();
  });

  it('should login the user', async (): Promise<void> => {
    spy = loginServiceMock.getSpy();

    const loginController: LoginController = new LoginController();
    const ctx: Context = createMockContext();

    ctx.request.body = {
      username: 'john.doe',
      password: 'secretpassword',
    };

    await loginController.login(ctx);

    expect(ctx.body).toMatchObject(loginSchema);
    expect(ctx.body.username).toEqual(ctx.request.body.username);
  });

  it('should return an error when credentials are invalid', async (): Promise<
    void
  > => {
    spy = loginServiceMock.getSpy({ simulateUserNotFound: true });

    const loginController: LoginController = new LoginController();
    const ctx: Context = createMockContext();

    ctx.request.body = {
      username: 'john.doe',
      password: 'secretpassword',
    };

    await loginController.login(ctx);

    expect(ctx.status).toEqual(401);
    expect(ctx.body).toMatchObject(errorSchema);
  });
});
