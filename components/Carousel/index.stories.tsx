import { ComponentMeta, ComponentStory } from "@storybook/react";
import Carousel from "./";

export default {
  title: "Carousel",
  component: Carousel,
} as ComponentMeta<typeof Carousel>;

const Template: ComponentStory<typeof Carousel> = (args) => (
  <Carousel {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  index: 0,
};

export const Third = Template.bind({});
Third.args = {
  ...Primary.args,
  index: 2,
};
