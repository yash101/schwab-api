module.exports = {
  testEnvironment: 'node',
  testMatch: [
    '**/src/test/**/*.test.ts',
    '**/src/test/**/*.spec.ts',
    '**/src/test/**/*.test.js',
    '**/src/test/**/*.spec.js',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/lib/',
    '/out/',
  ],
};
