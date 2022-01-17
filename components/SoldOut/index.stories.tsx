import { ComponentStory, ComponentMeta } from "@storybook/react";
import SoldOut from "./";

export default {
  title: "Shop/SoldOut",
  component: SoldOut,
} as ComponentMeta<typeof SoldOut>;

const Template: ComponentStory<typeof SoldOut> = (args) => (
  <SoldOut {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  title: "Special Edition",
  cards: [
    {
      info: "",
      suit: "clubs",
      value: "2",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/2-of-clubs-tang-yau-hoong.jpg",
      video: "",
      _id: "1",
      artist: { _id: "", name: "", slug: "", userpic: "", social: {} },
      deck: { _id: "", title: "", info: "", slug: "" },
    },
    {
      info: "",
      suit: "diamonds",
      value: "2",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/2-of-diamonds-yemayema.jpg",
      video: "",
      _id: "2",
      artist: { _id: "", name: "", slug: "", userpic: "", social: {} },
      deck: { _id: "", title: "", info: "", slug: "" },
    },
    {
      info: "",
      suit: "hearts",
      value: "3",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/2-of-hearts-peter-tarka.jpg",
      video: "",
      _id: "3",
      artist: { _id: "", name: "", slug: "", userpic: "", social: {} },
      deck: { _id: "", title: "", info: "", slug: "" },
    },
    {
      info: "",
      suit: "spades",
      value: "2",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/2-of-spades-mattias-adolfsson.jpg",
      video: "",
      _id: "4",
      artist: { _id: "", name: "", slug: "", userpic: "", social: {} },
      deck: { _id: "", title: "", info: "", slug: "" },
    },
    {
      info: "",
      suit: "clubs",
      value: "3",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/3-of-clubs-fernando-chamarelli.jpg",
      video: "",
      _id: "5",
      artist: { _id: "", name: "", slug: "", userpic: "", social: {} },
      deck: { _id: "", title: "", info: "", slug: "" },
    },
  ],
};

const ScrollableTemplate: ComponentStory<typeof SoldOut> = (args) => (
  <div css={{ paddingTop: 500, paddingBottom: 500 }}>
    <SoldOut {...args} />
  </div>
);
export const Scrollable = ScrollableTemplate.bind({});
Scrollable.args = {
  title: "Special Edition",
  cards: [
    {
      info: "",
      suit: "clubs",
      value: "2",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/2-of-clubs-tang-yau-hoong.jpg",
      video: "",
      _id: "1",
      artist: { _id: "", name: "", slug: "", userpic: "", social: {} },
      deck: { _id: "", title: "", info: "", slug: "" },
    },
    {
      info: "",
      suit: "diamonds",
      value: "2",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/2-of-diamonds-yemayema.jpg",
      video: "",
      _id: "2",
      artist: { _id: "", name: "", slug: "", userpic: "", social: {} },
      deck: { _id: "", title: "", info: "", slug: "" },
    },
    {
      info: "",
      suit: "hearts",
      value: "3",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/2-of-hearts-peter-tarka.jpg",
      video: "",
      _id: "3",
      artist: { _id: "", name: "", slug: "", userpic: "", social: {} },
      deck: { _id: "", title: "", info: "", slug: "" },
    },
    {
      info: "",
      suit: "spades",
      value: "2",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/2-of-spades-mattias-adolfsson.jpg",
      video: "",
      _id: "4",
      artist: { _id: "", name: "", slug: "", userpic: "", social: {} },
      deck: { _id: "", title: "", info: "", slug: "" },
    },
    {
      info: "",
      suit: "clubs",
      value: "3",
      opensea: "",
      img:
        "https://s3.amazonaws.com/img.playingarts.com/one-small-hd/3-of-clubs-fernando-chamarelli.jpg",
      video: "",
      _id: "5",
      artist: { _id: "", name: "", slug: "", userpic: "", social: {} },
      deck: { _id: "", title: "", info: "", slug: "" },
    },
  ],
};
