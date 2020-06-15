import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import nconf from 'nconf';

export default class AuthorizationService {
  private secret: Secret = nconf.get('JWT_SECRET');
  private oneDayInSeconds = 86400;
  private options: SignOptions = { expiresIn: this.oneDayInSeconds };

  createToken(payload: string | object | Buffer): string {
    return jwt.sign(payload, this.secret, this.options);
  }

  decodeToken(token: string): string | object {
    return jwt.verify(token, this.secret);
  }
}
