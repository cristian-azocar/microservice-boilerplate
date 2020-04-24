import supertest, { SuperTest, Test, Response } from 'supertest';
import app from 'src/app';
import apiDocsMock from 'tests/mocks/utils/api-docs';

const appTest: SuperTest<Test> = supertest(app.callback());

describe('api-docs router', (): void => {
  let spy: jest.SpyInstance;

  beforeAll((): void => {
    spy = apiDocsMock.getSpy();
  });

  afterAll((): void => {
    spy.mockRestore();
  });

  it('should return an HTML', async (): Promise<void> => {
    const response: Response = await appTest.get('/docs');

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('text/html');
  });
});
