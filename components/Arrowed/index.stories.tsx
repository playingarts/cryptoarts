import { ComponentStory, ComponentMeta } from "@storybook/react";
import Arrowed from ".";

export default {
  title: "Arrowed",
  component: Arrowed,
} as ComponentMeta<typeof Arrowed>;

const Template: ComponentStory<typeof Arrowed> = (args) => (
  <Arrowed {...args}>Text</Arrowed>
);

export const Prepend = Template.bind({});
Prepend.args = {
  position: "prepend",
};

export const Append = Template.bind({});
Append.args = {
  position: "append",
};
