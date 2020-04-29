describe('settings', (): void => {
  afterEach((): void => {
    jest.resetModules();
  });

  const getSettings = (): any => {
    /* eslint-disable global-require */
    require('settings/index');
    return require('nconf');
    /* eslint-enable global-require */
  };

  it('should set NODE_ENV value to "development" when no value is configured', (): void => {
    delete process.env.NODE_ENV;

    const nconf = getSettings();

    expect(nconf.get('NODE_ENV')).toEqual('development');
  });

  it('should set NODE_ENV value to the configured in the environment variable', (): void => {
    process.env.NODE_ENV = 'production';

    const nconf = getSettings();

    expect(nconf.get('NODE_ENV')).toEqual(process.env.NODE_ENV);
  });
});
