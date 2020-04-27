import 'tests/mocks/node-modules/mock-all';
import { Middleware } from 'koa';
import ApiDocsUtils from 'src/utils/api-docs';

describe('api-docs utils', (): void => {
  afterAll((): void => {
    jest.resetAllMocks();
  });

  it('should return a middleware', async (): Promise<void> => {
    const apiDocsUtils: ApiDocsUtils = new ApiDocsUtils();
    const middleware: Middleware = await apiDocsUtils.getSwaggerMiddleware();

    expect(middleware).toBeInstanceOf(Function);
  });
});
