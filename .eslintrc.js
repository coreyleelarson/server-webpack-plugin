module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  plugins: ['prettier'],
  rules: {
    'no-console': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
};
