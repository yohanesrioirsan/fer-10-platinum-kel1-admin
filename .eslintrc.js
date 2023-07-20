module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-param-reassign": 0,
    "import/no-extraneous-dependencies": 0,
    "react/prop-types": 0,
    "no-console": 0,
  },
};
