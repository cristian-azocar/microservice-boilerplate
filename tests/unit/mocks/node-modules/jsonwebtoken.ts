jest.mock('jsonwebtoken', () => ({
  __esModule: true,
  default: {
    sign: (): string => {
      return 'some-token';
    },
    verify: (): string | object => {
      return { key: 'value' };
    },
  },
}));
