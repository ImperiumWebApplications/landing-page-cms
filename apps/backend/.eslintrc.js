module.exports = {
  parser: '@babel/eslint-parser',
  extends: ['eslint:recommended', 'eslint-config-prettier'],
  env: {
    commonjs: true,
    es6: true,
    node: true,
    browser: false,
  },
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: false,
    },
    requireConfigFile: false,
    sourceType: 'module',
  },
  globals: {
    strapi: true,
  },
  plugins: ['eslint-plugin-prettier'],
  rules: {
    'no-console': 0,
    'prettier/prettier': 'error',
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'always'],
  },
};
