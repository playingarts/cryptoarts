import { ComponentStory, ComponentMeta } from "@storybook/react";
import Card from "./";

export default {
  title: "Cards/Card",
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  card: {
    _id: "_id",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.jpg",
    deck: {
      _id: "_id",
      title: "title",
      info: "info",
      slug: "slug",
    },
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
    _id: "_id",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.mp4",
    deck: {
      _id: "_id",
      title: "title",
      info: "info",
      slug: "slug",
    },
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
    _id: "_id",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.mp4",
    deck: {
      _id: "_id",
      title: "title",
      info: "info",
      slug: "slug",
    },
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
    _id: "_id",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.mp4",
    deck: {
      _id: "_id",
      title: "title",
      info: "info",
      slug: "slug",
    },
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
    _id: "_id",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.jpg",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.mp4",
    deck: {
      _id: "_id",
      title: "title",
      info: "info",
      slug: "slug",
    },
    artist: {
      _id: "_id",
      name: "Artist name",
      userpic: "userpic",
      social: {},
      slug: "slug",
    },
  },
};
