describe('settings', (): void => {
  afterEach((): void => {
    jest.resetModules();
  });

  it('should set NODE_ENV value to "development" when no value is configured', (): void => {
    delete process.env.NODE_ENV;

    // eslint-disable-next-line global-require
    const settings = require('settings/index').default;
    const defaultValue = 'development';

    expect(settings.get('NODE_ENV')).toEqual(defaultValue);
  });

  it('should set NODE_ENV value to the configured in the environment variable', (): void => {
    process.env.NODE_ENV = 'production';

    // eslint-disable-next-line global-require
    const settings = require('settings/index').default;

    expect(settings.get('NODE_ENV')).toEqual(process.env.NODE_ENV);
  });
});
