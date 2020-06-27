import 'tests/unit/mocks/services/user';
// import 'tests/unit/mocks/services/auth';
import 'tests/unit/mocks/node-modules/jsonwebtoken';
import AuthService from 'src/services/auth';
import LoginResponse from 'src/models/responses/login';
import loginSchema from 'tests/schemas/login';

describe('login service', (): void => {
  const authService: AuthService = new AuthService();

  it('should return OK when credentials are valid', async (): Promise<void> => {
    const loginResponse: LoginResponse = await authService.login(
      'john.doe',
      'secretpassword'
    );

    expect(loginResponse).toMatchObject(loginSchema);
  });

  it('should throw an error when credentials are invalid', async (): Promise<
    void
  > => {
    await expect(
      authService.login('john.doe', 'wrongpassword')
    ).rejects.toThrow();
  });

  it('should create a token', (): void => {
    const token: string = authService.createToken('payload');

    expect(token).toBeTruthy();
  });

  it('should decode a token', (): void => {
    const payload: string | object = authService.decodeToken('token');

    expect(payload).toBeTruthy();
  });
});
