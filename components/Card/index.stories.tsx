import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Card from "./";

export default {
  title: "CardBlock/Card",
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const WithVideo = Template.bind({});
WithVideo.args = {
  card: {
    _id: "_id",
    img:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.mp4",
    video:
      "https://s3.amazonaws.com/img.playingarts.com/crypto/cards/3-h-4J4x76NB.mp4",
    artist: "Artist",
  },
};
