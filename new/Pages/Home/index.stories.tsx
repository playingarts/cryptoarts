import { Meta, StoryObj } from "@storybook/react/*";
import Component from ".";
import { HttpResponse, graphql } from "msw";
import { mockDeck } from "../../../mocks/deck";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { MetaMaskProvider } from "metamask-react";
import SizeProvider from "../../../components/SizeProvider";

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

export const Default = {};
