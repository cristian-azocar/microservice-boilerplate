import LoginService from 'src/services/login';
import LoginResponse from 'src/models/responses/login';
import users from 'tests/fixtures/users';

function LoginServiceMock(): Partial<LoginService> {
  return {
    login: (username: string, password: string): Promise<LoginResponse> => {
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      return Promise.resolve(user);
    },
  };
}

jest.mock('src/services/login', () => LoginServiceMock);
