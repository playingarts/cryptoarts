import { Meta, StoryObj } from "@storybook/react/*";
import Component from ".";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { HttpResponse, graphql } from "msw";
import { mockDecks } from "../../../mocks/DecksQuery";
import { productsQuery } from "../../../mocks/productsQuery";

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
  component: Component,
  title: "New/MainMenu",
  decorators: (Story) => (
    <ApolloProvider client={mockedClient}>
      <Story />
    </ApolloProvider>
  ),
} as Meta<typeof Component>;

export default meta;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query("Products", () =>
          HttpResponse.json({
            data: {
              products: productsQuery.map((product) => ({
                ...product,
                deck: mockDecks.find((deck) => deck.slug === product.deck),
              })),
            },
          })
        ),
      ],
    },
  },
};
