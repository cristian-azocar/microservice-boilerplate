import AuthorizationService from 'src/services/authorization';

function AuthorizationServiceMock(): Partial<AuthorizationService> {
  return {
    createToken: (): string => {
      return '';
    },
  };
}

jest.mock('src/services/authorization', () => AuthorizationServiceMock);
