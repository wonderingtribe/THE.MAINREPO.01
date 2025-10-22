module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{js,ts}', '!src/**/*.test.{js,ts}', '!src/**/__tests__/**'],
  testMatch: ['**/tests/**/*.test.{js,ts}', '**/__tests__/**/*.{js,ts}'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
