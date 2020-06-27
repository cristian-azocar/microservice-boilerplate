import 'tests/unit/mocks/services/auth';
import { createMockContext } from '@shopify/jest-koa-mocks';
import { Context } from 'koa';
import AuthMiddleware from 'src/middlewares/auth';

describe('authorization middleware', (): void => {
  const authMiddleware: AuthMiddleware = new AuthMiddleware();
  const mockFn: jest.Mock = jest.fn();
  const throwFn: Function = (status: number, message: string) => {
    const error: object = { status, message };
    throw error;
  };

  afterAll((): void => {
    jest.resetAllMocks();
  });

  it('should invoke an injected function when Authorization header is valid', (): void => {
    const ctx: Context = createMockContext();

    ctx.header.authorization = 'Bearer some-credentials-here';

    authMiddleware.authorize(ctx, mockFn);

    expect(mockFn).toHaveBeenCalled();
  });

  it('should throw an error when Authorization header is not present', async (): Promise<
    void
  > => {
    const ctx: Context = createMockContext({ throw: throwFn });

    await expect(authMiddleware.authorize(ctx, mockFn)).rejects.toBeTruthy();
  });

  it('should throw an error when the token is invalid', async (): Promise<
    void
  > => {
    const ctx: Context = createMockContext({ throw: throwFn });

    ctx.header.authorization = 'Bearer invalid-token';

    await expect(authMiddleware.authorize(ctx, mockFn)).rejects.toBeTruthy();
  });

  it('should throw an error when Authorization header is not well formatted', async (): Promise<
    void
  > => {
    const ctx: Context = createMockContext({ throw: throwFn });

    ctx.header.authorization = 'Bearer';

    await expect(authMiddleware.authorize(ctx, mockFn)).rejects.toBeTruthy();
  });
});
