import 'tests/mocks/services/login';
import { Context } from 'koa';
import { createMockContext } from '@shopify/jest-koa-mocks';
import LoginController from 'src/controllers/login';
import loginSchema from 'tests/schemas/login';
import errorSchema from 'tests/schemas/error';

describe('login controller', (): void => {
  afterAll((): void => {
    jest.resetAllMocks();
  });

  it('should login the user', async (): Promise<void> => {
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
    const loginController: LoginController = new LoginController();
    const ctx: Context = createMockContext();

    ctx.request.body = {
      username: 'wrong.username',
      password: 'wrongpassword',
    };

    await loginController.login(ctx);

    expect(ctx.status).toEqual(401);
    expect(ctx.body).toMatchObject(errorSchema);
  });
});
