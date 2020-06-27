import AuthService from 'src/services/auth';
import LoginResponse from 'src/models/responses/login';
import users from 'tests/unit/fixtures/users';

function AuthServiceMock(): Partial<AuthService> {
  return {
    login: async (
      username: string,
      password: string
    ): Promise<LoginResponse> => {
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (!user) {
        throw new Error('Incorrect username or password');
      }

      const response: LoginResponse = {
        username: user.username,
        name: user.username,
        email: user.email,
        creationDate: user.creationDate,
        token: '',
      };

      return response;
    },
    createToken: (): string => {
      return 'encoded-token';
    },
    decodeToken: (token: string): string | object => {
      if (token === 'invalid-token') {
        throw new Error('Invalid token');
      }

      return 'decoded-token';
    },
  };
}

jest.mock('src/services/auth', () => AuthServiceMock);
