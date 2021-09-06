import supertest, { Response, SuperTest, Test } from 'supertest';

describe('AuthRouter', (): void => {
  const server: SuperTest<Test> = supertest(process.env.APP_URL);

  it('should log in a user in the system', async (): Promise<void> => {
    const user = { username: 'admin', password: '1234' };
    const response: Response = await server.post('/api/login').send(user);

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toMatchObject({
      username: expect.any(String),
      name: expect.any(String),
      email: expect.any(String),
      creationDate: expect.any(String),
      token: expect.any(String),
    });
  });
});
