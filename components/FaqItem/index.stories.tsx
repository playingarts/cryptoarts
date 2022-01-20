import { ComponentStory, ComponentMeta } from "@storybook/react";
import FaqItem from ".";

export default {
  title: "FAQ Item",
  component: FaqItem,
} as ComponentMeta<typeof FaqItem>;

const Template: ComponentStory<typeof FaqItem> = (args) => (
  <FaqItem {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  question: "What?",
  children: "Value",
};
