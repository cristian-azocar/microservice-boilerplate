import supertest, { Response, SuperTest, Test } from 'supertest';
import healthSchema from 'tests/schemas/health';

describe('health', (): void => {
  const server: SuperTest<Test> = supertest(process.env.APP_URL);

  it('should return the health of the service', async (): Promise<void> => {
    const response: Response = await server.get('/health');

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toMatchObject(healthSchema);
  });
});
