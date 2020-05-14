import supertest, { Response, SuperTest, Test } from 'supertest';
import nconf from 'nconf';

describe('content', () => {
  const server: SuperTest<Test> = supertest(nconf.get('APP_URL'));

  it('should return 200 and correct content-type', async (): Promise<void> => {
    const response: Response = await server.get('/health');

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
  });
});
