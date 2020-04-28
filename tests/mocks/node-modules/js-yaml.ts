jest.mock('js-yaml', () => ({
  __esModule: true,
  default: {
    safeLoad: (): object => {
      return { SERVICE_NAME: 'Microservice Boilerplate' };
    },
  },
}));
