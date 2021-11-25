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
  currentdeck: {
    id: 6,
  },
};
