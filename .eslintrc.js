module.exports = {
    extends: ['airbnb', 'plugin:prettier/recommended'],
    plugins: ['jest'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                semi: false,
                endOfLine: 'auto',
            },
        ],
        'no-plusplus': 'off',
        'max-classes-per-file': 'off',
        'react/jsx-filename-extension': 'off',
        'react/prefer-stateless-function': 'off',
        'react/state-in-constructor': 'off',
        'import/prefer-default-export': 'off',
    },
    env: {
        'jest/globals': true,
        browser: true,
        node: true,
    },
    parser: 'babel-eslint',
}
