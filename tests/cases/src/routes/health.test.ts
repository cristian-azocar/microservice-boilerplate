import supertest, { SuperTest, Test, Response } from 'supertest';
import app from 'src/app';
import healthMatch from 'tests/schemas/health';
import healthControllerMock from 'tests/mocks/controllers/health';

jest.mock('src/controllers/health');

const appTest: SuperTest<Test> = supertest(app.callback());

describe('health router', (): void => {
  let spy: jest.SpyInstance;

  beforeAll((): void => {
    spy = healthControllerMock.getSpy();
  });

  afterAll((): void => {
    spy.mockRestore();
  });

  it('should return a JSON with the health info', async (): Promise<void> => {
    const response: Response = await appTest.get('/health').expect(200);

    expect(response.body).toMatchObject(healthMatch);
  });
});
