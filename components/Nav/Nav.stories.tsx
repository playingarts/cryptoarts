import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Nav from ".";

export default {
  title: "Header/Nav",
  component: Nav,
} as ComponentMeta<typeof Nav>;

const Template: ComponentStory<typeof Nav> = (args) => <Nav {...args} />;

export const Primary = Template.bind({});
