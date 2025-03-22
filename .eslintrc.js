const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');

module.exports = {
    extends: [
        "expo", 
        "plugin:react/jsx-runtime", 
        "plugin:@typescript-eslint/recommended"
    ],
    settings: { react: { version : "detect" }, },
    plugins: [
        "react-refresh", 
        "@typescript-eslint",
    ],
    rules: {
      "no-underscore-dangle": [0],
      "@typescript-eslint/no-unused-vars": "error",
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
    },
}