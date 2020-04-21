module.exports = {
  roots: ['<rootDir>/tests'],
  preset: 'ts-jest',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '<rootDir>/settings/**/*.ts'],
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
    settings: '<rootDir>/settings',
    'tests/(.*)': '<rootDir>/tests/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/tests/schemas/',
    '<rootDir>/tests/matchers/',
  ],
};
