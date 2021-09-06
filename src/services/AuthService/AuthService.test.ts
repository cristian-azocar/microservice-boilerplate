import { mocked } from 'ts-jest/utils';
import UnauthorizedError from '../../errors/UnauthorizedError';
import UserService from '../UserService';
import AuthService from './AuthService';

jest.mock('../UserService');
jest.mock('jsonwebtoken', () => ({
  sign: () => 'encoded-token',
  verify: () => 'decoded-token',
}));

const mockUser = { username: 'john.doe', name: 'John Doe' };
const mockedService = mocked(UserService, true);

describe('AuthService', (): void => {
  test('returns a login result when credentials are valid', async () => {
    const authService = new AuthService();
    const serviceInstance = mockedService.mock.instances[0];

    serviceInstance.findByUsernameAndPassword = jest
      .fn()
      .mockImplementationOnce(() => mockUser);

    const loginResult = await authService.login('user', 'password');

    expect(loginResult).toMatchObject({
      ...mockUser,
      token: expect.any(String),
    });
  });

  test('throws an error when credentials are invalid', async () => {
    const authService = new AuthService();
    const serviceInstance = mockedService.mock.instances[0];

    serviceInstance.findByUsernameAndPassword = jest
      .fn()
      .mockImplementationOnce(() => undefined);

    expect(authService.login('', '')).rejects.toThrow(UnauthorizedError);
  });

  test('creates a JWT token', (): void => {
    const authService = new AuthService();
    const token = authService.createToken('payload');

    expect(token).toBeTruthy();
  });

  test('decodes a JWT token', (): void => {
    const authService = new AuthService();
    const payload = authService.decodeToken('token');

    expect(payload).toBeTruthy();
  });
});
