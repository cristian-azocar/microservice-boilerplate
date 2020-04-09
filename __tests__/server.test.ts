import app from '../src/app';

describe('server', (): void => {
  const mockListen: jest.Mock = jest.fn();
  const requireServer = (): void => {
    jest.isolateModules(() => {
      // eslint-disable-next-line global-require
      require('../src/server');
    });
  };

  app.listen = mockListen;

  afterEach((): void => {
    mockListen.mockReset();
  });

  it('should start the server', (): void => {
    requireServer();

    expect(mockListen).toHaveBeenCalled();
  });

  it('should start the server in a default port', (): void => {
    requireServer();

    expect(mockListen).toHaveBeenCalled();
    expect(mockListen.mock.calls[0][0]).toEqual(3000);
  });

  it('should start the server in a specific port', (): void => {
    process.env.PORT = '3001';

    requireServer();

    expect(mockListen).toHaveBeenCalled();
    expect(mockListen.mock.calls[0][0]).toEqual(3001);
  });

  it('should not raise an error when listen callback is called', (): void => {
    requireServer();

    expect(mockListen).toHaveBeenCalled();
    const listenCallback = mockListen.mock.calls[0][1];

    expect(() => listenCallback()).not.toThrow();
  });
});
