module.exports = {
  roots: ['<rootDir>/tests/unit'],
  preset: 'ts-jest',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
    'tests/(.*)': '<rootDir>/tests/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/tests/unit/schemas/',
    '<rootDir>/tests/unit/matchers/',
    '<rootDir>/tests/unit/fixtures/',
  ],
};
