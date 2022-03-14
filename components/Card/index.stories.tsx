import { ComponentStory, ComponentMeta } from "@storybook/react";
import { mockDeck } from "../../mocks/deck";
import Card from "./";

export default {
  title: "Card/Card",
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  card: {
    value: "",
    _id: "_id",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.jpg",
    deck: mockDeck,
    artist: {
      _id: "_id",
      name: "Artist name",
      userpic: "userpic",
      social: {},
      slug: "slug",
    },
  },
};

export const WithVideo = Template.bind({});
WithVideo.args = {
  card: {
    value: "",
    _id: "_id",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.mp4",
    deck: mockDeck,
    artist: {
      _id: "_id",
      name: "Artist name",
      userpic: "userpic",
      social: {},
      slug: "slug",
    },
  },
};

export const Animated = Template.bind({});
Animated.args = {
  animated: true,
  card: {
    value: "",
    _id: "_id",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.mp4",
    deck: mockDeck,
    artist: {
      _id: "_id",
      name: "Artist name",
      userpic: "userpic",
      social: {},
      slug: "slug",
    },
  },
};

export const Static = Template.bind({});
Static.args = {
  isStatic: true,
  card: {
    value: "",
    _id: "_id",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.mp4",
    deck: mockDeck,
    artist: {
      _id: "_id",
      name: "Artist name",
      userpic: "userpic",
      social: {},
      slug: "slug",
    },
  },
};

export const Big = Template.bind({});
Big.args = {
  size: "big",
  card: {
    value: "",
    _id: "_id",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.mp4",
    deck: mockDeck,
    artist: {
      _id: "_id",
      name: "Artist name",
      userpic: "userpic",
      social: {},
      slug: "slug",
    },
  },
};

export const BigInteractive = Template.bind({});
BigInteractive.args = {
  size: "big",
  interactive: true,
  card: {
    value: "",
    _id: "_id",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.mp4",
    deck: mockDeck,
    artist: {
      _id: "_id",
      name: "Artist name",
      userpic: "userpic",
      social: {},
      slug: "slug",
    },
  },
};

export const NoInfo = Template.bind({});
NoInfo.args = {
  noInfo: true,
  card: {
    _id: "_id",
    value: "",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.mp4",
    deck: mockDeck,
    artist: {
      _id: "_id",
      name: "Artist name",
      userpic: "userpic",
      social: {},
      slug: "slug",
    },
  },
};

export const CustomBackground = Template.bind({});
CustomBackground.args = {
  card: {
    value: "",
    _id: "_id",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.mp4",
    deck: mockDeck,
    background: "green",
    artist: {
      _id: "_id",
      name: "Artist name",
      userpic: "userpic",
      social: {},
      slug: "slug",
    },
  },
};
