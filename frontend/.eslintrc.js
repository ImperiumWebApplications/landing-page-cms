module.exports = {
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['next', 'next/core-web-vitals', 'prettier'],
  overrides: [
    {
      files: '**/*.+(ts|tsx)',
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json', './cypress/tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
      plugins: ['@typescript-eslint/eslint-plugin'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
    },
  ],
  settings: {
    next: {
      rootDir: './frontend',
    },
  },
};
