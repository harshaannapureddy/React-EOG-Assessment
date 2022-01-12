/* eslint-disable quotes */
module.exports = {
    env: {
        browser: true,
        es6: true,
        commonjs: true,
        node: true,
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'airbnb',
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        quotes: ['error', 'double'],
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        '@typescript-eslint/no-angle-bracket-type-assertion': 'off',
        'import/extensions': 0,
        'no-use-before-define': 'off',
        'jsx-quotes': [2, 'prefer-single'],
        'react/prop-types': 0,
    },
};
