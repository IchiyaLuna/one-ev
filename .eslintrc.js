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
    "no-console": "off",
    "no-unused-vars": "off",
    "vue/no-parsing-error": ["error", { "invalid-first-character-of-tag-name": false }],
    "@typescript-eslint/no-this-alias": "off",
    "no-this-alias": "off",
    "vue/valid-v-slot": [
      "error",
      {
        allowModifiers: true,
      },
    ],
  },
  globals: {
    $: true,
  },
};
