/*
 * @Author: Pan Jingyi
 * @Date: 2022-09-25 17:45:42
 * @LastEditTime: 2022-09-27 19:03:44
 */
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    // parser: '@babel/eslint-parser',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    requireConfigFile: false
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'endOfLine': 0,
    '@typescript-eslint/no-var-requires': 0,
    //关闭组件命名规则
    'vue/multi-word-component-names': 0,
    'no-undef': 0,
    'prefer-const': 0,
    'no-useless-escape': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'prettier/prettier': 'off'
  }
}
