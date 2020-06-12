module.exports = {
  preset: 'ts-jest',
  setupFiles: ['../../src/settings/load.ts'],
  moduleNameMapper: {
    'tests/(.*)': '<rootDir>/../$1',
  },
};
