jest.mock('fs', () => ({
  __esModule: true,
  default: {
    readFileSync: (): string => {
      return 'SERVICE_NAME: Microservice Boilerplate';
    },
  },
}));
