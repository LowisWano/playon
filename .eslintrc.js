// https://docs.expo.dev/guides/using-eslint/

export default {
  extends: ["expo", "prettier"],
  settings: {
    react: {
      version : "detect"
    },
  },
  plugins: ["prettier", "react"],
  rules: {
    "react/forbid-prop-types": [0],
    "react/require-default-props": [0],
    "global-require": [0],
    "no-underscore-dangle": [0],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto"
      },
    ],
  },
}