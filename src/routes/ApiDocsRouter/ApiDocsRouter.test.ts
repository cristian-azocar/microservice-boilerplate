import supertest from 'supertest';
import app from '../../app';

const appTest = supertest(app);

describe('api-docs router', (): void => {
  test('should return an HTML', async (): Promise<void> => {
    const response = await appTest.get('/api/docs');

    expect(response.status).toEqual(301);
    expect(response.type).toEqual('text/html');
  });
});
