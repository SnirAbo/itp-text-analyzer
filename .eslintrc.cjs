module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true },
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import', 'jsx-a11y'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  settings: { react: { version: 'detect' } },
  rules: {
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external', 'internal'], ['parent', 'sibling', 'index']],
        'newlines-between': 'always'
      }
    ],
    '@typescript-eslint/no-floating-promises': 'error',
    'react/react-in-jsx-scope': 'off'
  },
  ignorePatterns: ['dist', 'coverage', 'node_modules']
}
