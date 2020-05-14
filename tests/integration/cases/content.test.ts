import supertest, { Response } from 'supertest';
import nconf from 'nconf';

describe('content', () => {
  it('should return the expected content-type', async (): Promise<void> => {
    const response: Response = await supertest(nconf.get('APP_URL'))
      .get('/health')
      .expect(200);

    expect(response.type).toEqual('application/json');
  });
});
