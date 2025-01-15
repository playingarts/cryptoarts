import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Meta, StoryObj } from "@storybook/react/*";
import { MetaMaskProvider } from "metamask-react";
import Component from ".";
import SizeProvider from "../../../components/SizeProvider";
import { handlers } from "./HomeStoryHandlers";

type Story = StoryObj<typeof Component>;

const mockedClient = new ApolloClient({
  uri: "api/v1/graphql",
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});

const meta = {
  title: "New/Home/Home",
  tags: ["autodocs"],
  component: Component,
  decorators: (Story) => (
    <ApolloProvider client={mockedClient}>
      <MetaMaskProvider>
        <SizeProvider>
          <Story />
        </SizeProvider>
      </MetaMaskProvider>
    </ApolloProvider>
  ),
} as Meta<typeof Component>;

export default meta;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: handlers,
    },
  },
};
