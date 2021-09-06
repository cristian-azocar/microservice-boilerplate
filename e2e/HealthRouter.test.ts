import supertest, { Response, SuperTest, Test } from 'supertest';

describe('HealthRouter', (): void => {
  const server: SuperTest<Test> = supertest(process.env.APP_URL);

  test('returns the health of the service', async (): Promise<void> => {
    const response: Response = await server.get('/api/health');

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toMatchObject({
      nodeVersion: expect.any(String),
      service: expect.any(String),
      memory: expect.any(Object),
      pid: expect.any(Number),
      uptime: expect.any(Number),
      environment: expect.any(String),
    });
  });
});
