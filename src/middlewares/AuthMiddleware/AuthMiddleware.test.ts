import { getMockReq, getMockRes } from '@jest-mock/express';
import AuthMiddleware from './AuthMiddleware';

jest.mock('../../services/AuthService');

const { res } = getMockRes();
const authMiddleware = new AuthMiddleware();
const mockFn: jest.Mock = jest.fn();

describe('AuthMiddleware', (): void => {
  afterAll((): void => {
    jest.resetAllMocks();
  });

  test('invokes a callback function when Authorization header is valid', async (): Promise<void> => {
    const req = getMockReq();
    req.headers.authorization = 'Bearer some-credentials-here';
    await authMiddleware.authorize(req, res, mockFn);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('throws an error when Authorization header is not present', async (): Promise<void> => {
    const req = getMockReq();

    await expect(
      authMiddleware.authorize(req, res, mockFn)
    ).rejects.toBeTruthy();
  });

  test('throws an error when Authorization header is not well formatted', async (): Promise<void> => {
    const req = getMockReq();
    req.headers.authorization = 'Bearer';

    await expect(
      authMiddleware.authorize(req, res, mockFn)
    ).rejects.toBeTruthy();
  });
});
