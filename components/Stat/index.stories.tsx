import { ComponentStory, ComponentMeta } from "@storybook/react";
import Stat from ".";

export default {
  title: "Stat",
  component: Stat,
} as ComponentMeta<typeof Stat>;

const Template: ComponentStory<typeof Stat> = (args) => <Stat {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: "Label",
  value: "Value",
};

export const Eth = Template.bind({});
Eth.args = {
  label: "Label",
  value: 0.123,
  eth: true,
};
