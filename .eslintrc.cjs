module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint'],

  rules: {
    'no-console': 'off', // 禁用 console
    'no-debugger': 'off', // 禁用 debugger
    'no-alert': 'off', // 禁用 alert
    // indent: ['error', 2, { SwitchCase: 1 }], // 强制使用两个空格作为缩进

    // '@typescript-eslint/semi': 1,
    '@typescript-eslint/member-delimiter-style': 0,
    'comma-dangle': ['error', 'always-multiline'], // 逗号结束
    'no-param-reassign': 'error', // 禁止对 function 的参数进行重新赋值
    'prefer-rest-params': 0,
    'no-eval': 0,

    '@typescript-eslint/no-namespace': 0,
    // '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-explicit-any': 0, // 禁用 any 类型
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-empty-function': 0,
    'arrow-parens': 0,
    'vue/html-self-closing': 'off',

    // vue
    'vue/no-v-html': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-explicit-emits': 'off',
    'vue/multi-word-component-names': 'off',
  },

  ignorePatterns: ['out', 'dist', '**/*.d.ts'],
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
};
