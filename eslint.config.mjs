import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import js from "@eslint/js";

export default [
  js.configs.recommended,
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
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "@next/next": nextPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: "readonly",
        JSX: "readonly",
        GQL: "readonly",
        console: "readonly",
        window: "readonly",
        document: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        fetch: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        URL: "readonly",
        URLSearchParams: "readonly",
        FormData: "readonly",
        Headers: "readonly",
        Request: "readonly",
        Response: "readonly",
        AbortController: "readonly",
        AbortSignal: "readonly",
        process: "readonly",
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        Buffer: "readonly",
        Blob: "readonly",
        File: "readonly",
        FileReader: "readonly",
        HTMLElement: "readonly",
        HTMLInputElement: "readonly",
        HTMLButtonElement: "readonly",
        HTMLDivElement: "readonly",
        HTMLAnchorElement: "readonly",
        MouseEvent: "readonly",
        KeyboardEvent: "readonly",
        Event: "readonly",
        CustomEvent: "readonly",
        Navigator: "readonly",
        navigator: "readonly",
        IntersectionObserver: "readonly",
        ResizeObserver: "readonly",
        MutationObserver: "readonly",
        requestAnimationFrame: "readonly",
        cancelAnimationFrame: "readonly",
        performance: "readonly",
        crypto: "readonly",
        MediaQueryList: "readonly",
        matchMedia: "readonly",
        getComputedStyle: "readonly",
        atob: "readonly",
        btoa: "readonly",
        Image: "readonly",
        Audio: "readonly",
        Video: "readonly",
        NodeJS: "readonly",
      },
    },

    rules: {
      // TypeScript rules
      ...typescriptEslint.configs.recommended.rules,
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
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-explicit-any": "warn",

      // Next.js rules
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,

      // React rules
      "react/no-unknown-property": [
        "error",
        {
          ignore: ["css"],
        },
      ],
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // React Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // General rules
      curly: ["error"],
      "no-unused-vars": "off", // Use TypeScript's version
    },

    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
