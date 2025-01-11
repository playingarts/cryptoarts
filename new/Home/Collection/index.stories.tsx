import { Meta, StoryObj } from "@storybook/react/*";
import Component from ".";
import { HttpResponse, graphql } from "msw";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { productsQuery } from "../../../mocks/productsQuery";
import { mockDecks } from "../../../mocks/DecksQuery";

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
  component: Component,
  title: "New/Home/Collection/Collection",
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
