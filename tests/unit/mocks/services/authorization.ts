import AuthorizationService from 'src/services/authorization';

function AuthorizationServiceMock(): Partial<AuthorizationService> {
  return {
    createToken: (): string => {
      return '';
    },
    decodeToken: (token: string): string | object => {
      if (token === 'invalid-token') {
        throw new Error('Invalid token');
      }

      return '';
    },
  };
}

jest.mock('src/services/authorization', () => AuthorizationServiceMock);
