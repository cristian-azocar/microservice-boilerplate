import { Context } from 'koa';
import { createMockContext } from '@shopify/jest-koa-mocks';
import LoginController from 'src/controllers/login';
import loginSchema from '__tests__/schemas/login';
import loginServiceMock from '__mocks__/services/login';

describe('login controller', (): void => {
  let spy: jest.SpyInstance;

  beforeAll((): void => {
    spy = loginServiceMock.getSpy();
  });

  afterAll((): void => {
    spy.mockRestore();
  });

  it('should set ctx body with login information', async (): Promise<void> => {
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
});
