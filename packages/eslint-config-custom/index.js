module.exports = {
  extends: ['next', 'next/core-web-vitals', 'turbo', 'prettier'],
  plugins: ['@typescript-eslint', 'unused-imports'],
  parser: '@typescript-eslint/parser',
  rules: {
    'react/jsx-key': 'off',
    'react/display-name': 'off',
    '@next/next/no-img-element': 'off',
    'react/no-unescaped-entities': 0,
    'unused-imports/no-unused-imports-ts': 2,
    '@next/next/no-page-custom-font': 'off',
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
}
