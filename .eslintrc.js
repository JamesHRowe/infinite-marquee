module.exports = {
  extends: ['prettier'],
  env: {
    browser: true,
    es2020: true
  },
  plugins: ['prettier'],
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': []
  }
}
