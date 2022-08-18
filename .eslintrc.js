const baseJsRules = {
  'prettier/prettier': 'error',

  // We really don't mind if this is off for property reassignments
  'no-param-reassign': ['error', { props: false }],

  'no-mixed-operators': [
    'error',
    {
      groups: [
        ['%', '**'],
        ['%', '+'],
        ['%', '-'],
        ['%', '*'],
        ['%', '/'],
        ['/', '*'],
        ['&', '|', '<<', '>>', '>>>'],
        ['==', '!=', '===', '!=='],
        // Ideally ?: and ?? would be in the same group as && and ||, but prettier can't deal with that right now
        // https://github.com/prettier/prettier/issues/187
        ['&&', '||'],
        ['?:', '??'],
      ],
      allowSamePrecedence: false,
    },
  ],

  'import/no-extraneous-dependencies': [
    'error',
    {
      devDependencies: [
        'jest/**',
        'storybook/**',
        'src/**/*.stories.{ts,tsx}',
        'src/**/*.travelDate.{ts,tsx}',
      ],
      optionalDependencies: false,
    },
  ],
  'import/extensions': [
    'error',
    'ignorePackages',
    {
      js: 'never',
      mjs: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    },
  ],
};

const jsRules = {
  ...baseJsRules,
};

const tsRules = {
  ...baseJsRules,

  // These should already be handled by TypeScript
  'import/no-unresolved': 'off',
  'no-shadow': 'off',

  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/ban-ts-comment': 'error',
  '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
  '@typescript-eslint/consistent-type-assertions': [
    'error',
    {
      assertionStyle: 'as',
      objectLiteralTypeAssertions: 'allow-as-parameter',
    },
  ],
  '@typescript-eslint/restrict-plus-operands': 'error',
  '@typescript-eslint/explicit-function-return-type': [
    'error',
    {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
    },
  ],

  // Empty interfaces are sometimes useful
  '@typescript-eslint/no-empty-interface': 'off',

  // Sometimes necessary
  'import/prefer-default-export': 'off',

  // Required for e.g. Vue components
  'class-methods-use-this': 'off',

  // AirBnb specific overrides
  // These are necessary because TypeScript re-implements these rules for compatibility reasons
  // This should be kept in sync with the current eslint-config-airbnb-base version
  // AirBnb rules:
  // https://github.com/airbnb/javascript/tree/eslint-config-airbnb-base-v14.2.0/packages/eslint-config-airbnb-base/rules
  // TypeScript overrides:
  // https://github.com/typescript-eslint/typescript-eslint/blob/v4.10.0/packages/eslint-plugin/src/configs/recommended.ts
  '@typescript-eslint/no-array-constructor': 'error',
  '@typescript-eslint/no-unused-vars': 'error',
  '@typescript-eslint/naming-convention': [
    'error',
    { selector: 'default', format: ['camelCase', 'PascalCase'] },
    { selector: 'typeLike', format: ['PascalCase'] },
    { selector: 'property', format: null },
  ],

  '@typescript-eslint/ban-types': [
    'error',
    { extendDefaults: true, types: { object: false } },
  ],

  '@typescript-eslint/member-delimiter-style': 'error',
  '@typescript-eslint/type-annotation-spacing': 'error',
  '@typescript-eslint/explicit-module-boundary-types': 'off',

  // Correct no-shadow handling for enum support
  // https://github.com/typescript-eslint/typescript-eslint/issues/2471#issuecomment-696609988
  '@typescript-eslint/no-shadow': 'error',
};

module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
  },

  overrides: [
    {
      files: ['*.js'],

      parserOptions: {
        sourceType: 'module',
      },

      plugins: ['prettier'],

      extends: ['airbnb-base', 'prettier'],
      rules: jsRules,
    },

    {
      files: ['*.ts', '*.tsx', '*.vue'],

      parserOptions: {
        parser: '@typescript-eslint/parser',
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
        extraFileExtensions: ['vue'],
        ecmaFeatures: {
          jsx: true,
        },
        // Temporary fix for IDE issues with new files
        createDefaultProgram: true,
      },

      plugins: ['@typescript-eslint', 'vue', 'prettier'],

      extends: [
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:vue/recommended',
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/vue',
      ],
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.js', '.mjs', '.jsx', '.ts', '.tsx', '.vue'],
          },
        },
        'import/extensions': ['.js', '.mjs', '.jsx', '.ts', '.tsx', '.vue'],
      },
      rules: tsRules,
    },

    {
      files: ['*.stories.tsx', '*.travelDate.tsx'],
      rules: {
        'vue/one-component-per-file': 'off',
      },
    },
  ],
};
