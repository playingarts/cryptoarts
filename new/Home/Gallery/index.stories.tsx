import { Meta, StoryObj } from "@storybook/react/*";
import Component from ".";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { HttpResponse, graphql } from "msw";
import backgroundImage from "../../../mocks/images/backgroundImage.png";
import jd from "../../../mocks/images/jordanDebney.png";

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
  title: "New/Home/Gallery/Gallery",
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
        graphql.query("DailyCard", () =>
          HttpResponse.json({
            data: {
              dailyCard: {
                artist: {
                  slug: "jordan-debney",
                  name: "Jordan Debney",
                  country: "New Zealand",
                  info: "Artist, muralist, illustrator from Wellington, New Zealand.",
                  userpic: jd.src,

                  website: "https://linktr.ee/jordandebney",
                  shop: "https://shop.jordandebney.com/",
                  social: {
                    instagram: "https://instagram.com/jordandebney",
                    facebook: "",
                    twitter: "https://twitter.com/jordandebney",
                    behance: "",
                    dribbble: "",
                    foundation: "",
                    superrare: "",
                    makersplace: "",
                    knownorigin: "",
                    rarible: "",
                    niftygateway: "",
                    showtime: "",
                  },
                },
                info: "Psychedelic. In your face. There is nothing more fun than taking a simple concept and ruining it with how it can possibly be manipulated with my imagination.",
                suit: "diamonds",
                value: "ace",
                deck: "one",
                opensea: "",
                img: "https://s3.amazonaws.com/img.playingarts.com/one-big-hd/ace-of-diamonds-jordan-debney.jpg",
                cardBackground: backgroundImage.src,
                video: "",
              },
            },
          })
        ),
      ],
    },
  },
};
