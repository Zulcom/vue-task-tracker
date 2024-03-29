module.exports = {
  root: true,
  env: { 'browser': true },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 8,
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
    'plugin:vue/recommended',
    'standard'
  ],
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    /* max attributes-per-line and order-in-components
    ** we should use this later, when eslint-plugin-vue will support auto fixing this
    */
    'vue/max-attributes-per-line': 0,
    'vue/order-in-components': 0,
    'vue/attributes-order': 0,
    // less restricted v-for -> v-if rules
    'vue/no-confusing-v-for-v-if': 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'prefer-arrow-callback': 1,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-restricted-imports': [2, { 'paths': ['lodash-es'] }],
    'comma-dangle': 0, // dumb rule
    'no-param-reassign': 0, // used in basic vue code
  }
}
