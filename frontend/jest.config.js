/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

const esModules = ['hex-rgb'].join('|');

module.exports = {
  preset: 'ts-jest/presets/js-with-babel',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
};
