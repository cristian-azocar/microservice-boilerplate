import 'tests/unit/mocks/controllers/health';
import supertest, { SuperTest, Test, Response } from 'supertest';
import app from 'src/app';
import healthInfoSchema from 'tests/schemas/health';

const appTest: SuperTest<Test> = supertest(app.callback());

describe('health router', (): void => {
  afterAll((): void => {
    jest.restoreAllMocks();
  });

  it('should return a JSON with the health info', async (): Promise<void> => {
    const response: Response = await appTest.get('/health').expect(200);

    expect(response.body).toMatchObject(healthInfoSchema);
  });
});
