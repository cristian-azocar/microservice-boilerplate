jest.mock('json-refs', () => ({
  __esModule: true,
  default: {
    resolveRefs: (): Promise<any> => {
      return Promise.resolve({
        resolved: {},
      });
    },
  },
}));
