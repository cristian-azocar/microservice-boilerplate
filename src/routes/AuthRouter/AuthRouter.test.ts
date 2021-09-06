import { Request, Response, NextFunction } from 'express';
import supertest from 'supertest';
import app from '../../app';

const appTest = supertest(app);
const users = [
  {
    id: 1,
    username: 'john.doe',
    password: 'secretpassword',
    name: 'John',
    email: 'john.doe@fake.com',
    creationDate: new Date(),
  },
];

jest.mock('../../controllers/AuthController', () =>
  jest.fn().mockImplementationOnce(() => ({
    login: async (req: Request, res: Response): Promise<void> => {
      const { username, password } = req.body;
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (!user) {
        res.status(401);
        res.send({ code: 401, message: 'Incorrect username or password' });
        return;
      }

      const response = {
        username: user.username,
        name: user.name,
        email: user.email,
        creationDate: user.creationDate,
        token: '',
      };

      res.send(response);
    },
    logout: (req: Request, res: Response) => res.send(),
  }))
);

jest.mock('../../middlewares/AuthMiddleware', () =>
  jest.fn().mockImplementationOnce(() => ({
    authorize: async (req: Request, res: Response, next: NextFunction) => {
      await next();
    },
  }))
);

describe('AuthRouter', (): void => {
  test('returns a JSON with the login info', async () => {
    const response = await appTest
      .post('/api/login')
      .send({ username: 'john.doe', password: 'secretpassword' })
      .expect(200);

    expect(response.body).toBeDefined();
  });

  test('returns 401 for bad credentials', async (): Promise<void> => {
    const response = await appTest
      .post('/api/login')
      .send({ username: 'john.doe', password: 'wrongpassword' })
      .expect(401);

    expect(response.body).toBeDefined();
  });

  test('returns 400 for invalid credentials', async (): Promise<void> => {
    const response = await appTest
      .post('/api/login')
      .send({ username: 'john.doe' })
      .expect(400);

    expect(response.body).toBeDefined();
  });

  test('returns 200 for a logout', async (): Promise<void> => {
    await appTest
      .post('/api/logout')
      .send({ username: 'john.doe' })
      .expect(200);
  });
});
