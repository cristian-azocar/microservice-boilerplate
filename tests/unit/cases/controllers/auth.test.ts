import 'tests/unit/mocks/services/auth';
import { Context } from 'koa';
import { createMockContext } from '@shopify/jest-koa-mocks';
import AuthController from 'src/controllers/auth';
import loginSchema from 'tests/schemas/login';
import errorSchema from 'tests/schemas/error';

describe('auth controller', (): void => {
  afterAll((): void => {
    jest.resetAllMocks();
  });

  it('should login the user', async (): Promise<void> => {
    const authController: AuthController = new AuthController();
    const ctx: Context = createMockContext();

    ctx.request.body = {
      username: 'john.doe',
      password: 'secretpassword',
    };

    await authController.login(ctx);

    expect(ctx.body).toMatchObject(loginSchema);
    expect(ctx.body.username).toEqual(ctx.request.body.username);
  });

  it('should throw an error when credentials are invalid', async (): Promise<
    void
  > => {
    const authController: AuthController = new AuthController();
    const ctx: Context = createMockContext();

    ctx.request.body = {
      username: 'wrong.username',
      password: 'wrongpassword',
    };

    await expect(authController.login(ctx)).rejects.toThrow();
  });
});
