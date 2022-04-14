import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from ".";

export default {
  title: "Shop/AddToBag",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
);

export const Primary = Template.bind({});
