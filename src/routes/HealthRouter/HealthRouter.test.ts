import supertest from 'supertest';
import { Request, Response } from 'express';
import app from '../../app';

jest.mock('../../controllers/HealthController', () =>
  jest.fn().mockImplementationOnce(() => ({
    getHealthInfo: (req: Request, res: Response) => res.send('OK'),
  }))
);

const appTest = supertest(app);

describe('HealthRouter', (): void => {
  test('returns a JSON with the health info', async () => {
    const response = await appTest.get('/api/health').expect(200);

    expect(response.body).toBeDefined();
  });
});
