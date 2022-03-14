/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

const esModules = ['hex-rgb'].join('|');

module.exports = {
  preset: 'ts-jest/presets/js-with-babel',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/cypress/'],
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  globalSetup: '<rootDir>/jest.env.ts',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
    },
  },
};
