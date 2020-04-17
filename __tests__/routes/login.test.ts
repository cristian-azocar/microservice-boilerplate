import supertest, { SuperTest, Test, Response } from 'supertest';
import app from 'src/app';
import loginSchema from '__tests__/schemas/login';
import loginControllerMock from '__mocks__/controllers/login';

jest.mock('../../src/controllers/login');

const appTest: SuperTest<Test> = supertest(app.callback());

describe('login router', (): void => {
  let spy: jest.SpyInstance;

  beforeAll((): void => {
    spy = loginControllerMock.getSpy();
  });

  afterAll((): void => {
    spy.mockRestore();
  });

  it('should return a JSON with the login info', async (): Promise<void> => {
    const response: Response = await appTest
      .post('/login')
      .send({ username: 'john.doe', password: 'secretpassword' })
      .expect(200);

    expect(response.body).toMatchObject(loginSchema);
  });
});
