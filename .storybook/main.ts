import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  staticDirs: [
    "../public",
    // {
    //   from: "../fonts",
    //   to: "fonts",
    // },
    // "../fonts",
  ],

  stories: [
    "../new/**/*.stories.@(js|jsx|ts|tsx)",
    // "../components/**/*.stories.@(js|jsx|ts|tsx)",
  ],

  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-designs",
    "@storybook/addon-links",
    "msw-storybook-addon",
    // "storybook-addon-next-router",
    // "storybook-addon-apollo-client",
  ],

  framework: {
    name: "@storybook/nextjs",
    options: {},
  },

  docs: {
    autodocs: true,
  },

  webpackFinal: async (config) => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            test: /\.(glsl|vs|fs)$/,
            type: "asset/source",
          },
        ],
      },
    };
  },
};
export default config;
