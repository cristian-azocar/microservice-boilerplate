import supertest, { Response, SuperTest, Test } from 'supertest';
import nconf from 'nconf';
import loginSchema from 'tests/schemas/login';

describe('login', (): void => {
  const server: SuperTest<Test> = supertest(nconf.get('APP_URL'));

  it('should log in a user in the system', async (): Promise<void> => {
    const user: object = { username: 'john.doe', password: 'secretpassword' };
    const response: Response = await server.post('/login').send(user);

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toMatchObject(loginSchema);
  });
});
