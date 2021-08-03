import supertest, { Response, SuperTest, Test } from 'supertest';

describe('docs', (): void => {
  const server: SuperTest<Test> = supertest(process.env.APP_URL);

  it('should return the docs web page', async (): Promise<void> => {
    const response: Response = await server.get('/docs');

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('text/html');
  });
});
