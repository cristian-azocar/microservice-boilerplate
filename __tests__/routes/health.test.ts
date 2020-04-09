import supertest, { SuperTest, Test } from 'supertest';
import app from '../../src/app';
import healthMatch from '../../__matches__/health';

const appTest: SuperTest<Test> = supertest(app.callback());

describe('health router', (): void => {
  it('should return a JSON with the health info', async (): Promise<void> => {
    const response = await appTest.get('/health').expect(200);

    expect(response.body).toMatchObject(healthMatch);
  });
});
