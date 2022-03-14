import { ComponentStory, ComponentMeta } from "@storybook/react";
import AllEntriesBlock from ".";
import { mockDeck } from "../../mocks/deck";

export default {
  title: "AllEntriesBlock",
  component: AllEntriesBlock,
} as ComponentMeta<typeof AllEntriesBlock>;

const Template: ComponentStory<typeof AllEntriesBlock> = (args) => (
  <AllEntriesBlock {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  cards: [
    {
      _id: "_id",
      img: "img",
      value: "jack",
      suit: "diamonds",
      artist: {
        _id: "_id",
        name: "name",
        slug: "slug",
        userpic: "userpic",
        social: {},
      },
      deck: mockDeck,
    },
  ],
  deckId: "deckId",
};
