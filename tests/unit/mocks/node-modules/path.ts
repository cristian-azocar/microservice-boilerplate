jest.mock('path', () => ({
  __esModule: true,
  default: {
    join: (): string => {
      return 'C:/foo/bar/baz.txt';
    },
  },
}));
