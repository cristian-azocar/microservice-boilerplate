import { getMockReq, getMockRes } from '@jest-mock/express';
import ErrorHandlerMiddleware from './ErrorHandlerMiddleware';

const req = getMockReq();
const { res } = getMockRes();
const mockFn: jest.Mock = jest.fn();

describe('ErrorHandlerMiddleware', (): void => {
  const errorHandlerMiddleware = new ErrorHandlerMiddleware();

  test('adds a custom error to the response payload', (): void => {
    const error = {
      code: 401,
      message: 'Error message',
    };

    errorHandlerMiddleware.handleErrors(error, req, res, mockFn);

    expect(mockFn).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(error.code);
    expect(res.json).toHaveBeenCalledWith(error);
  });

  test('adds a default error message to the response payload', (): void => {
    const error = { code: 404 };

    errorHandlerMiddleware.handleErrors(error, req, res, mockFn);

    expect(mockFn).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(error.code);
    expect(res.json).toHaveBeenCalledWith({
      code: error.code,
      message: 'Internal Server Error',
    });
  });
});
