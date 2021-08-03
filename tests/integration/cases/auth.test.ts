import supertest, { Response, SuperTest, Test } from 'supertest';
import loginSchema from 'tests/schemas/login';

describe('auth', (): void => {
  const server: SuperTest<Test> = supertest(process.env.APP_URL);

  it('should log in a user in the system', async (): Promise<void> => {
    const user: object = { username: 'admin', password: '1234' };
    const response: Response = await server.post('/auth/login').send(user);

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toMatchObject(loginSchema);
  });
});
