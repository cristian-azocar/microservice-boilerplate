import 'tests/mocks/validators/login';
import { createMockContext } from '@shopify/jest-koa-mocks';
import { Context } from 'koa';
import LoginMiddleware from 'src/middlewares/login';
import errorSchema from 'tests/schemas/error';

describe('login middleware', (): void => {
  afterAll((): void => {
    jest.resetAllMocks();
  });

  it('should invoke an injected function when request is valid', (): void => {
    const loginMiddleware: LoginMiddleware = new LoginMiddleware();
    const ctx: Context = createMockContext();
    const mockFn: jest.Mock = jest.fn();

    ctx.request.body = {
      username: 'john.doe',
      password: 'secretpassword',
    };

    loginMiddleware.validateRequest(ctx, mockFn);

    expect(mockFn).toHaveBeenCalled();
  });

  it('should set ctx.body with an error object and ctx.status with a 404 code when request is invalid', (): void => {
    const loginMiddleware: LoginMiddleware = new LoginMiddleware();
    const ctx: Context = createMockContext();
    const mockFn: jest.Mock = jest.fn();

    ctx.request.body = {
      username: 'john.doe',
    };

    loginMiddleware.validateRequest(ctx, mockFn);

    expect(mockFn).not.toHaveBeenCalled();
    expect(ctx.status).toEqual(400);
    expect(ctx.body).toMatchObject(errorSchema);
  });
});
