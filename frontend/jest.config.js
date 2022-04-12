/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

const createJestConfig = require('next/jest')?.({
  dir: './',
});

const customJestConfig = {
  preset: 'ts-jest/presets/js-with-babel',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['/node_modules/'],
  testPathIgnorePatterns: [
    '<rootDir>/cypress/',
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
  ],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.spec.ts',
    '!**/*.config.ts',
    '!**/*.d.ts',
    '!**/mocks/**',
    '!**/cypress/**',
    '!**/node_modules/**',
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
    },
  },
  moduleNameMapper: {
    'hex-rgb': '<rootDir>/mocks/hex-rgb/index.ts',
  },
};

module.exports = createJestConfig(customJestConfig);
