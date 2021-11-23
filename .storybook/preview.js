import { ThemeProvider } from "@emotion/react";
import { theme } from "../pages/_app";
import { Links } from "../pages/_document";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Links />
      <Story />
    </ThemeProvider>
  ),
];
