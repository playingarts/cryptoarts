import { Meta, StoryObj } from "@storybook/react/*";
import Component from ".";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { HttpResponse, graphql } from "msw";

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
  title: "New/Home/Testimonials/Testimonials",
  decorators: (Story) => (
    <ApolloProvider client={mockedClient}>
      <div css={[{ marginTop: 50, marginBottom: 50 }]}>
        <Story />
      </div>
    </ApolloProvider>
  ),
} as Meta<typeof Component>;

export default meta;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query("Ratings", () =>
          HttpResponse.json({
            data: {
              ratings: [
                {
                  review: "Gorgeous.",
                  who: "Matthew V. from Florida, USA",
                  title: "Edition One",
                },
                {
                  review:
                    "Thank you for the smooth handling of getting the playing cards I ordered to me; not only are they little gems by their own right, they are also a perfect way to discover new talented artists, who I may otherwise never come across.",
                  who: "Matthew V. from Florida, USA",
                  title: "Special Edition",
                },
                {
                  review:
                    "I’ve never seen anything like this! Its like a gallery in a deck. Just stuning.",
                  who: "Matthew V. from Florida, USA",
                  title: "Edition Two",
                },
                {
                  review: "Amazing concept.”",
                  who: "Matthew V. from Florida, USA",
                  title: "Edition Two",
                },

                {
                  review: "Gorgeous.",
                  who: "Matthew V. from Florida, USA",
                  title: "Edition One",
                },
                {
                  review:
                    "Thank you for the smooth handling of getting the playing cards I ordered to me; not only are they little gems by their own right, they are also a perfect way to discover new talented artists, who I may otherwise never come across.",
                  who: "Matthew V. from Florida, USA",
                  title: "Special Edition",
                },
                {
                  review:
                    "I’ve never seen anything like this! Its like a gallery in a deck. Just stuning.",
                  who: "Matthew V. from Florida, USA",
                  title: "Edition Two",
                },
                {
                  review: "Amazing concept.”",
                  who: "Matthew V. from Florida, USA",
                  title: "Edition Two",
                },

                {
                  review: "Gorgeous.",
                  who: "Matthew V. from Florida, USA",
                  title: "Edition One",
                },
                {
                  review:
                    "Thank you for the smooth handling of getting the playing cards I ordered to me; not only are they little gems by their own right, they are also a perfect way to discover new talented artists, who I may otherwise never come across.",
                  who: "Matthew V. from Florida, USA",
                  title: "Special Edition",
                },
                {
                  review:
                    "I’ve never seen anything like this! Its like a gallery in a deck. Just stuning.",
                  who: "Matthew V. from Florida, USA",
                  title: "Edition Two",
                },
                {
                  review: "Amazing concept.”",
                  who: "Matthew V. from Florida, USA",
                  title: "Edition Two",
                },

                {
                  review: "Gorgeous.",
                  who: "Matthew V. from Florida, USA",
                  title: "Edition One",
                },
                {
                  review:
                    "Thank you for the smooth handling of getting the playing cards I ordered to me; not only are they little gems by their own right, they are also a perfect way to discover new talented artists, who I may otherwise never come across.",
                  who: "Matthew V. from Florida, USA",
                  title: "Special Edition",
                },
                {
                  review:
                    "I’ve never seen anything like this! Its like a gallery in a deck. Just stuning.",
                  who: "Matthew V. from Florida, USA",
                  title: "Edition Two",
                },
                {
                  review: "Amazing concept.”",
                  who: "Matthew V. from Florida, USA",
                  title: "Edition Two",
                },

                {
                  review: "Gorgeous.",
                  who: "Matthew V. from Florida, USA",
                  title: "Edition One",
                },
                {
                  review:
                    "Thank you for the smooth handling of getting the playing cards I ordered to me; not only are they little gems by their own right, they are also a perfect way to discover new talented artists, who I may otherwise never come across.",
                  who: "Matthew V. from Florida, USA",
                  title: "Special Edition",
                },
                {
                  review:
                    "I’ve never seen anything like this! Its like a gallery in a deck. Just stuning.",
                  who: "Matthew V. from Florida, USA",
                  title: "Edition Two",
                },
                {
                  review: "Amazing concept.”",
                  who: "Matthew V. from Florida, USA",
                  title: "Edition Two",
                },

                {
                  review: "Gorgeous.",
                  who: "Matthew V. from Florida, USA",
                  title: "Edition One",
                },
                {
                  review:
                    "Thank you for the smooth handling of getting the playing cards I ordered to me; not only are they little gems by their own right, they are also a perfect way to discover new talented artists, who I may otherwise never come across.",
                  who: "Matthew V. from Florida, USA",
                  title: "Special Edition",
                },
                {
                  review:
                    "I’ve never seen anything like this! Its like a gallery in a deck. Just stuning.",
                  who: "Matthew V. from Florida, USA",
                  title: "Edition Two",
                },
                {
                  review: "Amazing concept.”",
                  who: "Matthew V. from Florida, USA",
                  title: "Edition Two",
                },

                {
                  review: "Gorgeous.",
                  who: "Matthew V. from Florida, USA",
                  title: "Edition One",
                },
                {
                  review:
                    "Thank you for the smooth handling of getting the playing cards I ordered to me; not only are they little gems by their own right, they are also a perfect way to discover new talented artists, who I may otherwise never come across.",
                  who: "Matthew V. from Florida, USA",
                  title: "Special Edition",
                },
                {
                  review:
                    "I’ve never seen anything like this! Its like a gallery in a deck. Just stuning.",
                  who: "Matthew V. from Florida, USA",
                  title: "Edition Two",
                },
                {
                  review: "Amazing concept.”",
                  who: "Matthew V. from Florida, USA",
                  title: "Edition Two",
                },

                {
                  review: "Gorgeous.",
                  who: "Matthew V. from Florida, USA",
                  title: "Edition One",
                },
                {
                  review:
                    "Thank you for the smooth handling of getting the playing cards I ordered to me; not only are they little gems by their own right, they are also a perfect way to discover new talented artists, who I may otherwise never come across.",
                  who: "Matthew V. from Florida, USA",
                  title: "Special Edition",
                },
                {
                  review:
                    "I’ve never seen anything like this! Its like a gallery in a deck. Just stuning.",
                  who: "Matthew V. from Florida, USA",
                  title: "Edition Two",
                },
                {
                  review: "Amazing concept.”",
                  who: "Matthew V. from Florida, USA",
                  title: "Edition Two",
                },
              ],
            },
          })
        ),
      ],
    },
  },
};
