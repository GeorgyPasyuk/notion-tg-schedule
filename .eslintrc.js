module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  rules: {
    "simple-import-sort/imports": ["error", {
      groups: [
        ["^antd"],
        ["^@?\\w"],
        ["@/(.*)"],
        ["^[./]"]
      ]
    }],
  },
}