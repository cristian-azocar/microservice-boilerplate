import supertest, { SuperTest, Test, Response } from 'supertest';
import app from 'src/app';
import healthMatch from '__tests__/schemas/health';
import healthControllerMock from '__mocks__/controllers/health';

jest.mock('../../src/controllers/health');

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
