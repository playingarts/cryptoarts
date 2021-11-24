import { ComponentStory, ComponentMeta } from "@storybook/react";
import Bag from "../Icons/Bag";
import Component from "./";

export default {
  title: "Button",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  text: "Text Label",
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  text: "With Icon",
  Icon: Bag,
};
