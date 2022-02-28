module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2017,
    sourceType: 'module',
    project: ['./tsconfig.json', './cypress/tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  extends: [
    'next',
    'prettier',
    'plugin:cypress/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
  globals: {
    React: 'writable',
  },
  ignorePatterns: ['**/*.config.js', '.eslintrc.js'],
};
