module.exports = {
  "env": {
    "es6": true,
    "node": true,
    "browser": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "parser": "babel-eslint",
  "plugins": [
    "react",
    "eslint-plugin-flowtype",
  ],
  "globals": {
    "warn": true,
    "log": true,
    "error": true,
    "info": true,
    "fetch": true,
    "Tools": true,
    "__DEV__": true,
  },
  "rules": {
    "array-bracket-newline": "off",
    "array-bracket-spacing": [
      "error",
      "never"
    ],
    "array-element-newline": [
      "error",
      "consistent"
    ],
    "arrow-parens": "off",
    "arrow-spacing": [
      "error",
      {
        "after": true,
        "before": true
      }
    ],
    "block-scoped-var": "warn",
    "block-spacing": [
      "error",
      "always"
    ],
    "brace-style": [
      "error",
      "1tbs",
      {
        "allowSingleLine": true
      }
    ],
    "callback-return": "error",
    "camelcase": "off",
    "comma-dangle": [
      "warn",
      "always-multiline"
    ],
    "comma-spacing": [
      "error",
      {
        "after": true,
        "before": false
      }
    ],
    "comma-style": [
      "error",
      "last"
    ],
    "computed-property-spacing": [
      "error",
      "never"
    ],
    "consistent-this": "error",
    "curly": ["error", "multi-line"],
    "dot-location": ["warn", "property"],
    "dot-notation": [
      "warn",
      {
        "allowKeywords": true
      }
    ],
    "eol-last": "error",
    "eqeqeq": "off",
    "func-call-spacing": "error",
    "func-name-matching": "error",
    "func-names": [
      "error",
      "never"
    ],
    "func-style": [
      "error",
      "declaration",
      { "allowArrowFunctions": true }
    ],
    // "global-require": "error",
    "handle-callback-err": "warn",
    "id-length": "off",
    "implicit-arrow-linebreak": [
      "warn",
      "beside"
    ],
    "indent": ["error", 2, {
      "SwitchCase": 1,
    }],
    "indent-legacy": "off",
    "jsx-quotes": [
      "warn",
      "prefer-single"
    ],
    "key-spacing": "error",
    "keyword-spacing": [
      "error",
      {
        "after": true,
        "before": true
      }
    ],
    "linebreak-style": [
      "off"
    ],
    "lines-between-class-members": [
      "error",
      "always"
    ],
    "max-len": "off",
    "max-lines": ["warn", {
      "max": 500,
      "skipComments": true,
      "skipBlankLines": true,
    }],
    "max-lines-per-function": "off",
    "new-parens": "error",
    "newline-after-var": "off",
    "newline-before-return": "off",
    "newline-per-chained-call": [
      "warn",
      { "ignoreChainWithDepth": 3 }
    ],
    "no-array-constructor": "error",
    "no-await-in-loop": "warn",
    "no-catch-shadow": "error",
    "no-confusing-arrow": "error",
    "no-console": "warn",
    "no-class-assign": "off",
    "no-div-regex": "error",
    "no-duplicate-imports": "error",
    "no-else-return": "off",
    "no-empty-function": "warn",
    "no-eval": "warn",
    "no-extend-native": "error",
    "no-extra-bind": "warn",
    "no-extra-label": "warn",
    "no-extra-parens": "off",
    "no-floating-decimal": "error",
    "no-implicit-coercion": "error",
    "no-implicit-globals": "off",
    "no-implied-eval": "error",
    // "no-invalid-this": "error",
    "no-case-declarations": "off",
    "no-iterator": "error",
    "no-label-var": "error",
    "no-labels": "error",
    "no-lone-blocks": "error",
    "no-mixed-operators": "error",
    "no-mixed-requires": "error",
    "no-multi-assign": "error",
    "no-multi-spaces": "error",
    "no-multi-str": "error",
    "no-multiple-empty-lines": "warn",
    "no-negated-in-lhs": "error",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-object": "error",
    "no-new-require": "error",
    "no-new-wrappers": "error",
    "no-octal-escape": "error",
    "no-path-concat": "error",
    "no-plusplus": "off",
    "no-process-env": "error",
    "no-process-exit": "error",
    "no-proto": "error",
    "no-prototype-builtins": "off",
    "no-script-url": "error",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-shadow": "error",
    "no-shadow-restricted-names": "error",
    "no-spaced-func": "error",
    "no-sync": "error",
    "no-tabs": "off",
    "no-template-curly-in-string": "error",
    "no-ternary": "off",
    "no-trailing-spaces": "error",
    "no-mixed-spaces-and-tabs": [
      "off",
      "smart-tabs"
    ],
    "no-undef-init": "error",
    "no-undefined": "off",
    "no-unneeded-ternary": "warn",
    "no-unused-expressions": "error",
    "no-use-before-define": "off",
    "no-useless-call": "error",
    "no-useless-computed-key": "error",
    "no-useless-concat": "warn",
    "no-useless-constructor": "error",
    "no-useless-escape": "off",
    "no-useless-rename": "error",
    "no-useless-return": "error",
    "no-var": "warn",
    "no-void": "error",
    "no-whitespace-before-property": "error",
    "no-with": "error",
    "nonblock-statement-body-position": "error",
    "object-curly-newline": ["off", { "multiline": true }],
    "object-property-newline": ["error", { "allowAllPropertiesOnSameLine": true }],
    "object-curly-spacing": ["warn", "always"],
    "one-var": "off",
    "one-var-declaration-per-line": ["warn", "always"],
    "padded-blocks": "off",
    "padding-line-between-statements": "off",
    "prefer-arrow-callback": "off",
    // "prefer-const": "warn",
    "prefer-destructuring": "off",
    "prefer-numeric-literals": "warn",
    "prefer-promise-reject-errors": "error",
    "prefer-template": "off",
    "quote-props": ["warn", "as-needed"],
    "quotes": ["warn", "single", { "avoidEscape": true }],
    "radix": ["warn", "as-needed"],
    "require-await": "warn",
    "rest-spread-spacing": "error",
    "semi": ["error", "never"],
    "semi-spacing": "error",
    "semi-style": "error",
    "sort-imports": "off",
    "sort-keys": "off",
    "sort-vars": "off",
    "space-before-blocks": "error",
    "space-in-parens": [
      "error",
      "never"
    ],
    "space-unary-ops": "error",
    "switch-colon-spacing": "error",
    "template-curly-spacing": "error",
    "template-tag-spacing": "error",
    "vars-on-top": "warn",
    "wrap-iife": "error",
    "wrap-regex": "error",
    "react/no-deprecated": "off",
    "react/prop-types": "off",
    "react/jsx-closing-tag-location": "error",
    "react/no-string-refs": "off",
    "react/jsx-tag-spacing": ["error", {
      "closingSlash": "never",
      "beforeSelfClosing": "never",
      "beforeClosing": "never",
      "afterOpening": "never",
    }],
  },
  "overrides": [
    {
      "files": ["style.js"],
      "rules": {
        "object-curly-newline": "off",
      }
    }
  ]
};
