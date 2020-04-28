import 'tests/mocks/utils/api-docs';
import supertest, { SuperTest, Test, Response } from 'supertest';
import app from 'src/app';

const appTest: SuperTest<Test> = supertest(app.callback());

describe('api-docs router', (): void => {
  afterAll((): void => {
    jest.restoreAllMocks();
  });

  it('should return an HTML', async (): Promise<void> => {
    const response: Response = await appTest.get('/docs');

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('text/html');
  });
});
