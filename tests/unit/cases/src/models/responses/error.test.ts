import ErrorResponse from 'src/models/responses/error';

describe('error model', (): void => {
  it('should set default values when invoked with falsey parameters', (): void => {
    const errorResponse: ErrorResponse = new ErrorResponse(null);

    expect(errorResponse.code).toEqual(500);
    expect(errorResponse.message).toEqual('Internal Server Error');
  });
});
