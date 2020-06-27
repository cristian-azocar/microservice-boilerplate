import 'tests/unit/mocks/node-modules/joi';
import { createMockContext } from '@shopify/jest-koa-mocks';
import { Context } from 'koa';
import ValidatorMiddleware from 'src/middlewares/validator';
import loginSchema from 'src/validators/login';

describe('login middleware', (): void => {
  const validatorMiddleware: ValidatorMiddleware = new ValidatorMiddleware();
  const throwFn: Function = (status: number, message: string) => {
    const error: object = { status, message };
    throw error;
  };

  afterAll((): void => {
    jest.resetAllMocks();
  });

  it('should invoke an injected function when request is valid', async (): Promise<
    void
  > => {
    const ctx: Context = createMockContext({ throw: throwFn });
    const mockFn: jest.Mock = jest.fn();

    ctx.request.body = {
      username: 'john.doe',
      password: 'secretpassword',
    };

    await validatorMiddleware.validate(loginSchema)(ctx, mockFn);

    expect(mockFn).toHaveBeenCalled();
  });

  it('should throw an error when request is invalid', async (): Promise<
    void
  > => {
    const ctx: Context = createMockContext({ throw: throwFn });
    const mockFn: jest.Mock = jest.fn();

    ctx.request.body = {
      username: 'john.doe',
    };

    await expect(
      validatorMiddleware.validate(loginSchema)(ctx, mockFn)
    ).rejects.toBeTruthy();
  });
});
