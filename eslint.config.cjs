module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jsdoc', 'security', 'sonarjs', 'unicorn', 'eslint-comments'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'plugin:jsdoc/recommended-typescript',
    'plugin:security/recommended',
    'plugin:svelte/recommended',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    'plugin:eslint-comments/recommended',
    'standard-with-typescript'
  ],
  settings: {
    jsdoc: { ignoreInternal: true },
    svelte: {
      ignoreWarnings: [
        "@typescript-eslint/no-unsafe-assignment",
        "@typescript-eslint/no-unsafe-member-access",
        "@typescript-eslint/no-unsafe-argument"
      ]
    }
  },
  env: {
    browser: true,
    es2021: true,
    es6: true,
  },
  overrides: [{
    files: ["*.svelte"],
    parser: "svelte-eslint-parser",
    parserOptions: {
      parser: "@typescript-eslint/parser",
    },
    rules: {
      // Core
      "no-self-assign": 0, // In svelte this is used to reactively update a variable after using .push, .map etc.
      'no-undef-init': 0, // Svelte props are considered optional when initialized
      'no-undef': 0, // Svelte has accessors that don't need to be defined. ie, Nodejs
      // "no-extra-boolean-cast": 1, // Ensure we don't mix Boolean() and !!

      // Unicorn plugin
      // Enforce pascal case for svelte files, ignore sveltekit's special files like +page.svelte
      'unicorn/filename-case': ['error', { case: 'pascalCase', ignore: [/^\+.*\.svelte$/] }],
      'unicorn/no-useless-undefined': 0, // Svelte props are considered optional when initialized with 'undefined'

      // Svelte plugin
      // Stricter and more opinionated svelte specific rules that are not enabled with 'plugin:svelte/recommended'.
      'svelte/infinite-reactive-loop': 1,
      'svelte/no-store-async': 1,
      'svelte/no-target-blank': 1,
      'svelte/no-immutable-reactive-statements': 1,
      'svelte/no-reactive-functions': 1,
      'svelte/no-reactive-literals': 1,
      'svelte/no-useless-mustaches': 1,
      'svelte/prefer-destructured-store-props': 1,
      'svelte/require-optimized-style-attribute': 1,
      'svelte/valid-each-key': 1,

      // Typescript plugin
      "@typescript-eslint/promise-function-async": 0, // messy in svelte html markup
      "@typescript-eslint/no-unnecessary-condition": 0, // Optional svelte props require initial assignment causing type issues for existence checks
      "@typescript-eslint/non-nullable-type-assertion-style": 0,

      // Sonarjs plugin
      'sonarjs/no-unused-collection': 0, // Doesn't work with svelte.
    },
  }],
  rules: {
    // Core
    "no-unused-vars": 0, // tsserver already reports this
    "no-void": 0, // Conflicts with @typescript-eslint/no-floating-promises.

    // Typescript plugin
    "@typescript-eslint/no-unused-vars": 0, // tsserver already reports this
    "@typescript-eslint/no-confusing-void-expression": 0, // No
    "@typescript-eslint/strict-boolean-expressions": 0, // A bit excessive.

    // JsDoc plugin
    'jsdoc/check-indentation': 1, // Enforce consistent indentation levels.
    'jsdoc/informative-docs': 1, // No repeating names in descriptions.
    'jsdoc/no-bad-blocks': 1, // Enforce 2 astersisks (**) for start of jsdoc block.
    'jsdoc/no-blank-blocks': 1, // No empty block comments.
    'jsdoc/no-blank-block-descriptions': 1, // No extra empty lines in the block description.
    'jsdoc/require-asterisk-prefix': 1, // Enforce each line in jsdoc block starts with an asterisk.
    'jsdoc/sort-tags': 1, // Enforce a specific order for tags.
    'jsdoc/require-hyphen-before-param-description': ["warn", "always"], // Enforce a specific order for tags.
    'jsdoc/require-description-complete-sentence': 1, // Enforce correct sentence structure for descriptions.

    // Unicorn plugin
    'unicorn/switch-case-braces': ['error', 'avoid'],
    'unicorn/filename-case': ['error', { case: 'kebabCase' }],
    'unicorn/consistent-function-scoping': ['error', { "checkArrowFunctions": false }],
    'unicorn/prevent-abbreviations': ['error', {
      "allowList": {
        "mod": true,
        "Mod": true,
        "src": true
      }
    }],

    // Security plugin
    'security/detect-object-injection': 0,

    // Eslint comment plugin
    'eslint-comments/no-unused-disable': 1,
    'eslint-comments/require-description': 1,
  }
};
