import 'tests/unit/mocks/services/user';
import 'tests/unit/mocks/services/authorization';
import LoginService from 'src/services/login';
import LoginResponse from 'src/models/responses/login';
import loginSchema from 'tests/schemas/login';

describe('login service', (): void => {
  it('should return OK when credentials are valid', async (): Promise<void> => {
    const loginService: LoginService = new LoginService();
    const loginResponse: LoginResponse = await loginService.login(
      'john.doe',
      'secretpassword'
    );

    expect(loginResponse).toMatchObject(loginSchema);
  });

  it('should return null when credentials are invalid', async (): Promise<
    void
  > => {
    const loginService: LoginService = new LoginService();
    const loginResponse: LoginResponse = await loginService.login(
      'john.doe',
      'wrongpassword'
    );

    expect(loginResponse).toBeNull();
  });
});
