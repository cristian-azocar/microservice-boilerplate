import 'tests/unit/mocks/middlewares/validator';
import 'tests/unit/mocks/controllers/auth';
import supertest, { SuperTest, Test, Response } from 'supertest';
import app from 'src/app';
import loginSchema from 'tests/schemas/login';
import errorSchema from 'tests/schemas/error';

const appTest: SuperTest<Test> = supertest(app.callback());

describe('auth router', (): void => {
  afterAll((): void => {
    jest.restoreAllMocks();
  });

  it('should return a JSON with the login info', async (): Promise<void> => {
    const response: Response = await appTest
      .post('/auth/login')
      .send({ username: 'john.doe', password: 'secretpassword' })
      .expect(200);

    expect(response.body).toMatchObject(loginSchema);
  });

  it('should return 401 for bad credentials', async (): Promise<void> => {
    const response: Response = await appTest
      .post('/auth/login')
      .send({ username: 'john.doe', password: 'wrongpassword' })
      .expect(401);

    expect(response.body).toMatchObject(errorSchema);
  });

  it('should return 400 for invalid credentials', async (): Promise<void> => {
    const response: Response = await appTest
      .post('/auth/login')
      .send({ username: 'john.doe' })
      .expect(400);

    expect(response.body).toMatchObject(errorSchema);
  });
});
