module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'prettier/prettier': 1,
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    eqeqeq: ['warn', 'always'],
    'prefer-const': [
      'error',
      { destructuring: 'all', ignoreReadBeforeAssign: true },
    ],
    '@typescript-eslint/indent': [
      'error',
      2,
      { VariableDeclarator: 4, SwitchCase: 1 },
    ],
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/no-triple-slash-reference': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/no-this-alias': 0,
    '@typescript-eslint/triple-slash-reference': [
      'error',
      { path: 'always', types: 'never', lib: 'never' },
    ],
  },
};
