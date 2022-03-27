module.exports = {
  root: true,
  env: {
    node: true,
    jquery: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-undef": "off",
    "vue/no-parsing-error": ["error", { "invalid-first-character-of-tag-name": false }],
    "@typescript-eslint/no-this-alias": "off",
  },
  globals: {
    $: true,
  },
};
