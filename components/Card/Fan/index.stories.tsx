import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardFan from ".";
import { CardsQuery } from "../../../hooks/card";

export default {
  title: "Card/Fan",
  component: CardFan,
} as ComponentMeta<typeof CardFan>;

const deck: GQL.Deck = {
  _id: "_id",
  title: "title",
  info: "info",
  slug: "slug",
};

const artist = {
  _id: "11",
  slug: "slug",
  name: "name",
  userpic: "userpic",
  info: "info",
  social: { facebook: "" },
};

const cards: GQL.Card[] = [
  {
    _id: "1",
    artist,
    img: "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.jpg",
    info: "info",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.mp4",
    deck,
  },
  {
    _id: "2",
    artist,
    img: "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/2-of-clubs-tang-yau-hoong.jpg",
    info: "info",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.mp4",
    deck,
  },
  {
    _id: "3",
    artist,
    img: "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/2-of-diamonds-yemayema.jpg",
    info: "info",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.mp4",
    deck,
  },
  {
    _id: "4",
    artist,
    img: "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/2-of-hearts-peter-tarka.jpg",
    info: "info",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.mp4",
    deck,
  },
  {
    _id: "5",
    artist,
    img: "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/2-of-spades-mattias-adolfsson.jpg",
    info: "info",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.mp4",
    deck,
  },
  {
    _id: "6",
    artist,
    img: "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/3-of-clubs-fernando-chamarelli.jpg",
    info: "info",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/2-s-7Tw67g2w.mp4",
    deck,
  },
];

const Template: ComponentStory<typeof CardFan> = (args) => (
  <CardFan {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  deck,
};
Primary.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: CardsQuery,
          variables: {
            deck: deck._id,
            shuffle: true,
          },
        },
        result: {
          data: {
            cards,
          },
        },
      },
    ],
  },
};

const ScrollableTemplate: ComponentStory<typeof CardFan> = (args) => (
  <div css={{ paddingTop: 500, paddingBottom: 500, textAlign: "center" }}>
    <CardFan {...args} />
  </div>
);

export const Scrollable = ScrollableTemplate.bind({});
Scrollable.args = {
  deck,
};
Scrollable.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: CardsQuery,
          variables: {
            deck: deck._id,
            shuffle: true,
          },
        },
        result: {
          data: {
            cards,
          },
        },
      },
    ],
  },
};
