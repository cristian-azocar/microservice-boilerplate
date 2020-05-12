import supertest, { Response } from 'supertest';

describe('content', () => {
  it('should return the expected content-type', async (): Promise<void> => {
    const response: Response = await supertest('http://localhost:3000')
      .get('/health')
      .expect(200);

    expect(response.type).toEqual('application/json');
  });
});
