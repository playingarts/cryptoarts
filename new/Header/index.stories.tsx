import { MetaMaskProvider } from "metamask-react";
import Component from ".";
import { Meta, StoryObj } from "@storybook/react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { HttpResponse, graphql } from "msw";
import SizeProvider from "../../components/SizeProvider";
import { mockDeck } from "../../mocks/deck";

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

type Story = StoryObj<typeof Component>;

const meta = {
  title: "new/Header/Header",
  tags: ["autodocs"],
  component: Component,
  parameters: {
    msw: {
      handlers: [
        graphql.query("DeckQuery", () => {
          return HttpResponse.json({
            data: { deck: undefined },
          });
        }),
      ],
    },
  },

  decorators: (Story) => (
    <ApolloProvider client={mockedClient}>
      <MetaMaskProvider>
        <SizeProvider>
          <Story />
          <div css={[{ height: 2000 }]}></div>
        </SizeProvider>
      </MetaMaskProvider>
    </ApolloProvider>
  ),
} as Meta<typeof Component>;

export default meta;

export const MainPageHeader: Story = {};

export const DeckPageHeader: Story = {
  parameters: {
    nextjs: {
      router: {
        pathname: "/[deckId]]",
        asPath: "/zero",
        query: {
          deckId: "zero",
        },
      },
    },
    msw: {
      handlers: [
        graphql.query("Deck", () =>
          HttpResponse.json({
            data: { deck: { ...mockDeck, title: "Zero" } },
          })
        ),
      ],
    },
  },
};
