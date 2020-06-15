import 'tests/unit/mocks/services/authorization';
import { createMockContext } from '@shopify/jest-koa-mocks';
import { Context } from 'koa';
import errorSchema from 'tests/schemas/error';
import AuthorizationMiddleware from 'src/middlewares/authorization';

describe('authorization middleware', (): void => {
  const authorizationMiddleware: AuthorizationMiddleware = new AuthorizationMiddleware();
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

    authorizationMiddleware.authorize(ctx, mockFn);

    expect(mockFn).toHaveBeenCalled();
  });

  it('should throw an error when Authorization header is not present', (): void => {
    const ctx: Context = createMockContext({ throw: throwFn });

    expect(() => authorizationMiddleware.authorize(ctx, mockFn)).toThrow();
  });

  it('should throw an error when the token is invalid', (): void => {
    const ctx: Context = createMockContext({ throw: throwFn });

    ctx.header.authorization = 'Bearer invalid-token';

    expect(() => authorizationMiddleware.authorize(ctx, mockFn)).toThrow();
  });

  it('should throw an error when Authorization header is not well formatted', (): void => {
    const ctx: Context = createMockContext({ throw: throwFn });

    ctx.header.authorization = 'Bearer';

    expect(() => authorizationMiddleware.authorize(ctx, mockFn)).toThrow();
  });

  it('should set the context with a custom error when an exception with status 401 is thrown', async (): Promise<
    void
  > => {
    const ctx: Context = createMockContext();
    const asyncThrowFn: jest.Mock = jest.fn(
      async (): Promise<any> => throwFn(401, 'Error message')
    );

    await authorizationMiddleware.handleErrors(ctx, asyncThrowFn);

    expect(asyncThrowFn).toHaveBeenCalled();
    expect(ctx.status).toEqual(401);
    expect(ctx.body).toMatchObject(errorSchema);
  });

  it('should set the context with an "Unauthorized" text when no message is present in the exception', async (): Promise<
    void
  > => {
    const ctx: Context = createMockContext();
    const asyncThrowFn: jest.Mock = jest.fn(
      async (): Promise<any> => throwFn(401, undefined)
    );

    await authorizationMiddleware.handleErrors(ctx, asyncThrowFn);

    expect(asyncThrowFn).toHaveBeenCalled();
    expect(ctx.status).toEqual(401);
    expect(ctx.body).toMatchObject(errorSchema);
    expect(ctx.body.message).toEqual('Unauthorized');
  });

  it('should re-throw an error when an exception with an status distinct to 401 is thrown', async (): Promise<
    void
  > => {
    const ctx: Context = createMockContext();
    const asyncThrowFn: jest.Mock = jest.fn(
      async (): Promise<any> => throwFn(500, 'Error')
    );

    await expect(
      authorizationMiddleware.handleErrors(ctx, asyncThrowFn)
    ).rejects.toBeTruthy();
  });
});
