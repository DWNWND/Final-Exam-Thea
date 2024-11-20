import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import ts from "@typescript-eslint/eslint-plugin"; // Import TypeScript plugin
import tsParser from "@typescript-eslint/parser"; // Import TypeScript parser
import globals from "globals";
// import js from "eslint-plugin-js";

export default [
  { ignores: ["dist"] },

  // **Configuration for JavaScript files**
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  },

  // **Configuration for TypeScript files**
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsParser, // Use TypeScript parser
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
        project: "./tsconfig.json", // Reference your tsconfig.json
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      "@typescript-eslint": ts, // TypeScript ESLint plugin
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...ts.configs.recommended.rules, // TypeScript recommended rules
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  },
];

// import js from "@eslint/js";
// import globals from "globals";
// import react from "eslint-plugin-react";
// import reactHooks from "eslint-plugin-react-hooks";
// import reactRefresh from "eslint-plugin-react-refresh";
// import ts from "@typescript-eslint/eslint-plugin";
// import tsParser from '@typescript-eslint/parser';

// export default [
//   { ignores: ["dist"] },
//   {
//     files: ["**/*.{js,jsx,ts,tsx}"],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//       parser: tsParser,
//       parserOptions: {
//         ecmaVersion: "latest",
//         ecmaFeatures: { jsx: true },
//         sourceType: "module",
//         project: "./tsconfig.json",
//       },
//     },
//     settings: { react: { version: "18.3" } },
//     plugins: {
//       react,
//       "react-hooks": reactHooks,
//       "react-refresh": reactRefresh,
//       "@typescript-eslint": ts,
//     },
//     rules: {
//       ...js.configs.recommended.rules,
//       ...react.configs.recommended.rules,
//       ...react.configs["jsx-runtime"].rules,
//       ...reactHooks.configs.recommended.rules,
//       ...ts.configs.recommended.rules,
//       "react/jsx-no-target-blank": "off",
//       "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
//     },
//   },
// ];
