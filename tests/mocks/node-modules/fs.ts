const fs: typeof jest = jest.mock('fs', () => ({
  __esModule: true,
  default: {
    readFileSync: (): string => {
      return 'SERVICE_NAME: Microservice Boilerplate';
    },
  },
}));

export default fs;
