module.exports = {
  roots: ['<rootDir>/__tests__'],
  preset: 'ts-jest',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
    settings: '<rootDir>/settings',
    '__matches__/(.*)': '<rootDir>/__matches__/$1',
    '__mocks__/(.*)': '<rootDir>/__mocks__/$1',
  },
};
