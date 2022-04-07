import { ComponentStory, ComponentMeta } from "@storybook/react";
import StoreButtons from "./";

export default {
  title: "StoreButtons",
  component: StoreButtons,
} as ComponentMeta<typeof StoreButtons>;

const Template: ComponentStory<typeof StoreButtons> = (args) => (
  <StoreButtons {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  ButtonProps: {
    color: "black",
  },
};
