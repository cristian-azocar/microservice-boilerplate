import { createMockContext } from '@shopify/jest-koa-mocks';
import { Context } from 'koa';
import ErrorHandlerMiddleware from 'src/middlewares/error-handler';
import errorSchema from 'tests/schemas/error';

describe('error handler middleware', (): void => {
  const errorHandlerMiddleware: ErrorHandlerMiddleware = new ErrorHandlerMiddleware();
  const buildAsyncThrowFn = (status: number, message: string): jest.Mock => {
    return jest.fn(
      async (): Promise<void> => {
        const error: object = { status, message };
        throw error;
      }
    );
  };

  it('should set ctx with a custom error', async (): Promise<void> => {
    const ctx: Context = createMockContext();
    const asyncThrowFn: jest.Mock = buildAsyncThrowFn(401, 'Error message');

    await errorHandlerMiddleware.handleErrors(ctx, asyncThrowFn);

    expect(asyncThrowFn).toHaveBeenCalled();
    expect(ctx.status).toEqual(401);
    expect(ctx.body).toMatchObject(errorSchema);
    expect(ctx.body.message).toEqual('Error message');
  });

  it('should set ctx with a default message', async (): Promise<void> => {
    const ctx: Context = createMockContext();
    const asyncThrowFn: jest.Mock = buildAsyncThrowFn(404, undefined);

    await errorHandlerMiddleware.handleErrors(ctx, asyncThrowFn);

    expect(asyncThrowFn).toHaveBeenCalled();
    expect(ctx.status).toEqual(404);
    expect(ctx.body).toMatchObject(errorSchema);
    expect(ctx.body.message).toEqual('Internal Server Error');
  });
});
