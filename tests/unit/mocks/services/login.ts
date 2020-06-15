import LoginService from 'src/services/login';
import LoginResponse from 'src/models/responses/login';
import users from 'tests/unit/fixtures/users';

function LoginServiceMock(): Partial<LoginService> {
  return {
    login: async (
      username: string,
      password: string
    ): Promise<LoginResponse> => {
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (!user) {
        return Promise.resolve(null);
      }

      const response: LoginResponse = {
        username: user.username,
        name: user.username,
        email: user.email,
        creationDate: user.creationDate,
        token: '',
      };

      return Promise.resolve(response);
    },
  };
}

jest.mock('src/services/login', () => LoginServiceMock);
