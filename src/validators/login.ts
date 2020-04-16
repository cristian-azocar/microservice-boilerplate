import { ValidationResult } from '@hapi/joi';
import schema from 'src/validators/schemas/login';

export default class LoginValidator {
  validate(value: any): ValidationResult {
    return schema.validate(value);
  }
}
