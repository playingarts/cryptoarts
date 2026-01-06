import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      "**/node_modules",
      "**/dist",
      "**/typings",
      "**/components",
      "**/.next",
      "**/public/**",
      "**/__MACOSX/**",
      "**/PlayingArtsKit/**",
      "**/dump/**",
      "**/__tests__/**",
      "**/jest/**",
      "**/next-env.d.ts",
      "**/next.config.js",
      "**/*.config.mjs",
      "**/*.config.js",
      "**/source/**",
      "**/mocks/**",
      "**/.storybook/**",
      "**/scripts/**",
    ],
  },
  ...compat.extends("next/core-web-vitals"),
  ...compat.extends("plugin:@typescript-eslint/eslint-recommended"),
  ...compat.extends("plugin:@typescript-eslint/recommended"),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
      parser: tsParser,
    },

    rules: {
      "react/no-unknown-property": [
        "error",
        {
          ignore: ["css"],
        },
      ],

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: false,
          argsIgnorePattern: "^_+$",
          varsIgnorePattern: "^_+$",
        },
      ],

      curly: ["error"],
    },
  },
];
