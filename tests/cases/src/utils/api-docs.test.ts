import 'tests/mocks/node-modules/koa2-swagger-ui';
import 'tests/mocks/node-modules/fs';
import 'tests/mocks/node-modules/js-yaml';
import 'tests/mocks/node-modules/json-refs';
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
