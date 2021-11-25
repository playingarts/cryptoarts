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
  currentdeck: {
    id: 6,
  },
};
