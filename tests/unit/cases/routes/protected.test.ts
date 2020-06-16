import 'tests/unit/mocks/middlewares/authorization';
import supertest, { SuperTest, Test, Response } from 'supertest';
import app from 'src/app';
import protectedSchema from 'tests/schemas/protected';
import errorSchema from 'tests/schemas/error';

const appTest: SuperTest<Test> = supertest(app.callback());

describe('protected router', (): void => {
  it('should return Unauthorized', async (): Promise<void> => {
    const response: Response = await appTest.get('/protected');

    expect(response.status).toEqual(401);
    expect(response.body).toMatchObject(errorSchema);
  });

  it('should return OK', async (): Promise<void> => {
    const response: Response = await appTest
      .get('/protected')
      .set('Authorization', 'Bearer some-credentials');

    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject(protectedSchema);
  });
});
