module.exports = {
  parser: "@babel/eslint-parser",
  extends: ["eslint:recommended", "eslint-config-prettier", "plugin:react/recommended"],
  env: {
    commonjs: true,
    es6: true,
    node: true,
    browser: false,
  },
  parserOptions: {
    babelOptions: {
      presets: ["@babel/preset-react"],
    },
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    requireConfigFile: false,
    sourceType: "module",
  },
  globals: {
    strapi: true,
  },
  plugins: ["eslint-plugin-prettier"],
  rules: {
    "no-console": 0,
    "prettier/prettier": "error",
    "linebreak-style": ["error", "unix"],
    semi: ["error", "always"],
  },
};
