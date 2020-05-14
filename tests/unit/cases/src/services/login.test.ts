import LoginService from 'src/services/login';
import LoginResponse from 'src/models/responses/login';
import loginSchema from 'tests/schemas/login';

describe('login service', (): void => {
  it('should return the login information', async (): Promise<void> => {
    const loginService: LoginService = new LoginService();
    const loginResponse: LoginResponse = await loginService.login(
      'john.doe',
      'secretpassword'
    );

    expect(loginResponse).toMatchObject(loginSchema);
  });
});
