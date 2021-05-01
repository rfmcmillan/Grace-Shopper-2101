module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:mocha/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
  },
  plugins: [
    'react',
    'mocha',
  ],
  rules: {
    'linebreak-style': 'off',
    'prefer-arrow-callback': 'off',
    'func-names': 'off',
    'no-unused-expressions': 'off',
  },
};
