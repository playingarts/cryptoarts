import { ComponentStory, ComponentMeta } from "@storybook/react";
import Card from ".";
import { CardsQuery } from "../../../hooks/card";

export default {
  title: "Card/List",
  component: Card,
} as ComponentMeta<typeof Card>;

const deck: GQL.Deck = {
  _id: "_id",
  title: "title",
  info: "info",
  slug: "slug",
};

const artist: GQL.Artist = {
  _id: "artistId",
  slug: "artistSlug",
  name: "Leonardoworx",
  userpic:
    "https://s3.amazonaws.com/img.playingarts.com/crypto/upics/leonardoworx.jpg",
  info:
    "Leonardo Betti, better known as Leonardoworx, is a…tions in international art galleries and museums.",
  website: "website",
  country: "country",
  social: {
    website: "",
    instagram: "https://www.instagram.com/leonardoworx/",
    facebook: "",
    twitter: "https://twitter.com/leonardoworx",
    behance: "https://www.behance.net/leonardoworx",
    dribbble: "",
    foundation: "https://foundation.app/@leonardoworx",
    superrare: "",
    makersplace: "",
    knownorigin: "",
    rarible: "",
    niftygateway: "",
    showtime: "",
  },
};

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  deckId: deck._id,
};
Primary.parameters = {
  apolloClient: {
    mocks: [
      {
        delay: 1000,
        request: {
          query: CardsQuery,
          variables: {
            deck: deck._id,
          },
        },
        result: {
          data: {
            cards: [
              {
                deck,
                artist,
                value: "",
                _id: "_id",
                img:
                  "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.jpg",
                info: "",
                video: "",
                opensea: "opensea",
                background: "background",
              },
              {
                deck,
                artist,
                value: "",
                _id: "_id2",
                img:
                  "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.jpg",
                video:
                  "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.mp4",
                opensea: "opensea",
                background: "background",
                info: "",
              },
              {
                deck,
                artist,
                value: "",
                _id: "_id",
                img:
                  "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.jpg",
                video: "",
                opensea: "opensea",
                background: "background",
                info: "",
              },
              {
                deck,
                artist,
                value: "",
                _id: "_id2",
                img:
                  "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.jpg",
                video:
                  "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.mp4",
                opensea: "opensea",
                background: "background",
                info: "",
              },
            ],
          },
        },
      },
    ],
  },
};
