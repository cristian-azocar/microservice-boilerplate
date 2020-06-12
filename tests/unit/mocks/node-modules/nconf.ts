declare class Provider {
  argv(): Provider;
  env(): Provider;
}

const provider: Provider = {
  argv: (): Provider => provider,
  env: (): Provider => provider,
};

let settings: { [key: string]: any };

jest.mock('nconf', () => ({
  __esModule: true,
  default: {
    defaults: (options?: object): Provider => {
      settings = {
        ...settings,
        ...options,
      };

      return provider;
    },
    file: (): Provider => {
      return provider;
    },
    argv: (): Provider => {
      return provider;
    },
    env: (): Provider => {
      return provider;
    },
    get: (key?: string): any => {
      return settings[key];
    },
  },
}));
