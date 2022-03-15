import { ComponentStory, ComponentMeta } from "@storybook/react";
import Header from "./";

export default {
  title: "Header/Header",
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Primary = Template.bind({});

export const Gradient = Template.bind({});
Gradient.args = {
  palette: "gradient",
};
