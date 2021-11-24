import { ComponentStory, ComponentMeta } from "@storybook/react";
import SubMenu from ".";

export default {
  title: "Header/SubMenu",
  component: SubMenu,
} as ComponentMeta<typeof SubMenu>;

const Template: ComponentStory<typeof SubMenu> = (args) => (
  <SubMenu {...args} />
);

export const Crypto = Template.bind({});
Crypto.args = {
  decks: [
    {
      Deck: "zero",
      id: 0,
    },
    {
      Deck: "one",
      id: 1,
    },
    {
      Deck: "two",
      id: 2,
    },
    {
      Deck: "three",
      id: 3,
    },
    {
      Deck: "special",
      id: 4,
    },
    {
      Deck: "future",
      id: 5,
    },
    {
      Deck: "crypto",
      id: 6,
    },
  ],
  currentdeck: {
    id: 6,
  },
};
