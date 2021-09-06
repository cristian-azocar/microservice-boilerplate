import supertest, { Response, SuperTest, Test } from 'supertest';

describe('ApiDocsRouter', (): void => {
  const server: SuperTest<Test> = supertest(process.env.APP_URL);

  it('should return the docs web page', async (): Promise<void> => {
    const response: Response = await server.get('/api/docs');

    expect(response.status).toEqual(301);
    expect(response.type).toEqual('text/html');
  });
});
