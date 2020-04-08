import { Server } from 'http';
import { AddressInfo } from 'net';

describe('server', (): void => {
  beforeEach((): void => {
    jest.resetModules();
  });

  it('should start and shutdown the server', (): void => {
    // eslint-disable-next-line global-require
    const server: Server = require('../src/server');
    server.close();
  });

  it('should run the server in a default port', (): void => {
    delete process.env.PORT;
    // eslint-disable-next-line global-require
    const server: Server = require('../src/server');
    const serverAddress: AddressInfo = server.address() as AddressInfo;
    expect(serverAddress.port).toEqual(3000);
    server.close();
  });

  it('should run the server in a specific port', (): void => {
    process.env.PORT = '3001';
    // eslint-disable-next-line global-require
    const server: Server = require('../src/server');
    const serverAddress: AddressInfo = server.address() as AddressInfo;
    expect(serverAddress.port).toEqual(3001);
    server.close();
  });
});
