import 'tests/unit/mocks/node-modules/jsonwebtoken';
import AuthorizationService from 'src/services/authorization';

describe('authorization service', (): void => {
  const authorizationService: AuthorizationService = new AuthorizationService();

  it('should create a token', (): void => {
    const token: string = authorizationService.createToken('payload');

    expect(token).toBeTruthy();
  });

  it('should decode a token', (): void => {
    const payload: string | object = authorizationService.decodeToken('token');

    expect(payload).toBeTruthy();
  });
});
