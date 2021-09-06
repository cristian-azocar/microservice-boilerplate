import app from './app';

jest.mock('./app', () => ({
  listen: jest.fn(),
}));

describe('server', (): void => {
  const requireServer = (): void => {
    jest.isolateModules(() => {
      // eslint-disable-next-line global-require
      require('./server');
    });
  };

  afterEach((): void => {
    jest.clearAllMocks();
  });

  test('starts the server', (): void => {
    requireServer();

    expect(app.listen).toHaveBeenCalledTimes(1);
  });

  test('starts the server in a default port', (): void => {
    requireServer();

    expect(app.listen).toHaveBeenCalledTimes(1);
    expect(app.listen).toHaveBeenCalledWith(3000, expect.any(Function));
  });

  test('starts the server in a specific port', (): void => {
    process.env.PORT = '3001';

    requireServer();

    expect(app.listen).toHaveBeenCalledTimes(1);
    expect(app.listen).toHaveBeenCalledWith(3001, expect.any(Function));
  });

  test('does not raise an error when listen callback is called', (): void => {
    requireServer();

    expect(app.listen).toHaveBeenCalledTimes(1);

    const mockListen = app.listen as jest.Mock;
    const listenCallback = mockListen.mock.calls[0][1];

    expect(listenCallback).not.toThrow();
  });
});
