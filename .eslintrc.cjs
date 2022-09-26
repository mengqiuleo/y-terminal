/*
 * @Author: Pan Jingyi
 * @Date: 2022-09-25 17:45:42
 * @LastEditTime: 2022-09-26 16:51:48
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
    endOfLine: 0,
    '@typescript-eslint/no-var-requires': 0,
    //关闭组件命名规则
    'vue/multi-word-component-names': 'off',
    'no-undef': 'off',
    'prefer-const': 'off',
    'no-useless-escape': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  }
}
