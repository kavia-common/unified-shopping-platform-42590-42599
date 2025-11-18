import js from "@eslint/js";
import vue from "eslint-plugin-vue";

/**
 * PUBLIC_INTERFACE
 * ESLint flat config for ESLint v9+ to satisfy CI lint step.
 * Minimal rules to avoid heavy plugin dependencies that may be missing in CI.
 */
export default [
  js.configs.recommended,
  ...vue.configs["flat/recommended"],
  {
    files: ["src/**/*.{ts,tsx,js,jsx,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },
];
