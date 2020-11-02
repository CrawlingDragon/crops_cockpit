/* eslint-disable semi */
module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["plugin:vue/essential", "standard"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module"
  },
  plugins: ["vue"],
  rules: {
    quotes: ["error", "double"],
    "space-before-function-paren": 0,
    semi: ["error", "always"],
    "spaced-comment": ["error", "always", { markers: ["/*", "//"] }],
    "comma-dangle": "off",
    eqeqeq: "off"
  }
};
