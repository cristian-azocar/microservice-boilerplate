import LoginValidator from 'src/validators/login';
import { ValidationResult } from '@hapi/joi';

const successValidationResult: ValidationResult = {
  value: undefined,
  error: undefined,
};

const errorValidationResult: ValidationResult = {
  value: undefined,
  error: {
    message: 'Missing parameters',
    isJoi: false,
    _object: undefined,
    details: undefined,
    name: undefined,
    annotate: undefined,
  },
};

function LoginValidatorMock(): Partial<LoginValidator> {
  return {
    validate: (value: any): ValidationResult => {
      return !value || !value.username || !value.password
        ? errorValidationResult
        : successValidationResult;
    },
  };
}

jest.mock('src/validators/login', () => LoginValidatorMock);
