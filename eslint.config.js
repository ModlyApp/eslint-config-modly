import * as eslintrc from '@eslint/eslintrc'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// mimic CommonJS variables
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new eslintrc.FlatCompat({
  baseDirectory: __dirname
})

const ecmaVersion = 2021

export default [
  ...compat.config({
    extends: [
      'plugin:sonarjs/recommended-legacy',
      'plugin:@typescript-eslint/strict-type-checked',
      'plugin:@typescript-eslint/stylistic-type-checked',
      'plugin:svelte/recommended',
      'plugin:jsdoc/recommended-typescript',
      'plugin:unicorn/recommended',
      'love'
    ],
    plugins: [
      '@typescript-eslint',
      "jsdoc",
      "security",
      "sonarjs",
      "unicorn"
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json',
      ecmaVersion,
      extraFileExtensions: ['.svelte']
    },
    settings: {
      jsdoc: { ignoreInternal: true },
      svelte: {
        ignoreWarnings: [
          "@typescript-eslint/no-unsafe-assignment",
          "@typescript-eslint/no-unsafe-member-access",
          "@typescript-eslint/no-unsafe-argument",
          "@typescript-eslint/promise-function-async",
          "sonarjs/no-extra-arguments", // Does not pickup svelte's snippet args
          "sonarjs/no-use-of-empty-return-value", // Does not work with svelte's snippets
          "sonarjs/no-unused-collection", // Does not work within svelte markup
        ]
      }
    },
    env: {
      browser: true,
      es2021: true,
      es6: true,
    },
    rules: {
      // Core
      'no-void': 0, // Conflicts with @typescript-eslint/no-floating-promises.

      // Typescript plugin
      '@typescript-eslint/no-unused-vars': 0, // tsserver already reports this
      '@typescript-eslint/no-confusing-void-expression': 0, // No
      '@typescript-eslint/strict-boolean-expressions': 0, // A bit excessive.
      '@typescript-eslint/explicit-function-return-type': 0,
      // '@typescript-eslint/naming-convention': 0,

      // JsDoc plugin
      'jsdoc/check-indentation': 1, // Enforce consistent indentation levels.
      'jsdoc/informative-docs': 1, // No repeating names in descriptions.
      'jsdoc/no-bad-blocks': 1, // Enforce 2 astersisks (**) for start of jsdoc block.
      'jsdoc/no-blank-blocks': 1, // No empty block comments.
      'jsdoc/no-blank-block-descriptions': 1, // No extra empty lines in the block description.
      'jsdoc/require-asterisk-prefix': 1, // Enforce each line in jsdoc block starts with an asterisk.
      'jsdoc/sort-tags': 1, // Enforce a specific order for tags.
      'jsdoc/require-hyphen-before-param-description': ['warn', 'always'], // Enforce Hyphen in param definitions
      'jsdoc/require-description-complete-sentence': 1, // Enforce correct sentence structure for descriptions.

      // Unicorn plugin
      'unicorn/switch-case-braces': ['error', 'avoid'],
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
      'unicorn/consistent-function-scoping': ['error', { checkArrowFunctions: false }],
      // 'unicorn/prevent-abbreviations': 0,

      // Security plugin
      'security/detect-object-injection': 0
    },
    overrides: [{
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion,
        ecmaFeatures: {
          globalReturn: false,
        }
      },
      rules: {
        // Core
        '@typescript-eslint/no-unsafe-call': 0, // Does not work with svelte's $bindable prop

        // Unicorn plugin
        // Enforce pascal case for svelte files, ignore sveltekit's special files like +page.svelte
        'unicorn/filename-case': ['error', { case: 'pascalCase', ignore: [/^\+.*\.svelte$/] }],

        // Svelte plugin
        'svelte/infinite-reactive-loop': 1,
        'svelte/no-store-async': 1,
        'svelte/no-target-blank': 1,
        'svelte/no-immutable-reactive-statements': 1,
        'svelte/no-reactive-functions': 1,
        'svelte/no-reactive-literals': 1,
        'svelte/no-useless-mustaches': 1,
        // 'svelte/prefer-destructured-store-props': 0, // Invalid with svelte runes
        'svelte/require-optimized-style-attribute': 1,
        'svelte/valid-each-key': 1,

        // Typescript plugin
        "@typescript-eslint/no-unnecessary-condition": 0, // Optional svelte props require initial assignment causing type issues for existence checks

        // Sonarjs plugin
        'sonarjs/no-unused-collection': 0, // Doesn't work with svelte processor at all.
      },
    }],
  }),

  // Global Plugins and Rules

  {
    files: ['**/*.ts', '**/*.svelte'],
    linterOptions: {
      reportUnusedDisableDirectives: true
    },
  },
]
