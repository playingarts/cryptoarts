import { ComponentStory, ComponentMeta } from "@storybook/react";
import Menu from ".";

export default {
  title: "Header/Menu",
  component: Menu,
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => <Menu {...args} />;

export const Dark = Template.bind({});
Dark.args = {
  palette: "dark",
};

export const Crypto = Template.bind({});
Crypto.args = {
  decks: [
    {
      deck: "zero",
      id: 0,
    },
    {
      deck: "one",
      id: 1,
    },
    {
      deck: "two",
      id: 2,
    },
    {
      deck: "three",
      id: 3,
    },
    {
      deck: "special",
      id: 4,
    },
    {
      deck: "future",
      id: 5,
    },
    {
      deck: "crypto",
      id: 6,
    },
  ],
  currentdeck: {
    id: 6,
  },
};
