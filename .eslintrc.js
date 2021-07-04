module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["react"],
    rules: {
        "no-console": "warn",
        "import/first": "error",
        "react/prop-types": 0,
        "linebreak-style": ["error", "unix"],
        "prettier/prettier": "error",
        "linebreak-style": ["error", "unix"],
        "arrow-body-style": "off",
        "prefer-arrow-callback": "off",
        "react/react-in-jsx-scope": "off"
    },
}