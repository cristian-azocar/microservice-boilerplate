import schema from 'src/validators/schemas/login';
import BadRequestError from 'src/errors/bad-request';

export default class AuthValidator {
  validateLogin(value: any): void {
    const { error } = schema.validate(value);

    if (error) {
      throw new BadRequestError(error.message);
    }
  }
}
