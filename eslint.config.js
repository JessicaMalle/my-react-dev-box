import pluginJs from '@eslint/js';
import eslintPluginImport from 'eslint-plugin-import';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const customRules = {
  'react/jsx-uses-react': 'off',
  'react/react-in-jsx-scope': 'off',
  'semi': ['error', 'always'],
  'object-curly-spacing': ['error', 'always'],
  'no-multiple-empty-lines': ['error', { 'max': 1 }],
  'indent': ['error', 2],
  'quotes': ['error', 'single'],
  'no-unused-vars': 'error',
  'comma-dangle': ['error', 'always-multiline'],
  'import/first': 'error',
  'import/order': ['error', {
    'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
    'newlines-between': 'never',
    'alphabetize': { 'order': 'asc', 'caseInsensitive': true },
    'pathGroups': [
      {
        'pattern': 'react',
        'group': 'external',
        'position': 'before',
      },
    ],
    'pathGroupsExcludedImportTypes': ['builtin'],
  }],
  'import/no-duplicates': ['error', { 'considerQueryString': true }],
};

const customSettings = {
  react: {
    version: 'detect',
  },
};

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  {
    plugins: {
      import: eslintPluginImport,
    },
    rules: customRules,
    settings: customSettings,
  },
];
