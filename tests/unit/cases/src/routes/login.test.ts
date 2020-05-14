import 'tests/unit/mocks/controllers/login';
import supertest, { SuperTest, Test, Response } from 'supertest';
import app from 'src/app';
import loginSchema from 'tests/unit/schemas/login';

const appTest: SuperTest<Test> = supertest(app.callback());

describe('login router', (): void => {
  afterAll((): void => {
    jest.restoreAllMocks();
  });

  it('should return a JSON with the login info', async (): Promise<void> => {
    const response: Response = await appTest
      .post('/login')
      .send({ username: 'john.doe', password: 'secretpassword' })
      .expect(200);

    expect(response.body).toMatchObject(loginSchema);
  });
});
