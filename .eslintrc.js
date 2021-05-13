module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "space-before-function-paren": ["error", "never"],
    "dot-notation": 'off',
    "object-curly-spacing": ["error", "never"],
    "indent": ["error", 2],
    "vue/script-indent": ["error", 2, {
      "baseIndent": 1,
      "switchCase": 1,
      "ignores": []
    }],
  },
  overrides: [
    {
      "files": ["*.vue"],
      "rules": {
        "indent": "off"
      }
    }
  ],
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
}
