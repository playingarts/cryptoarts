import { Meta, StoryObj } from "@storybook/react/*";
import Component from ".";

type Story = StoryObj<typeof Component>;

const meta = {
  component: Component,
  title: "New/Home/Hero/Hero",
} as Meta<typeof Component>;

export default meta;

export const Default: Story = {
  parameters: {
    design: {
      type: "figspec",
      url: "https://www.figma.com/design/MDJjecRss6ILUdH6eCcvwQ/Playing-Arts-website-2025-(Copy)?node-id=3400-25763&t=VZTjZEeVPXCWxLko-4",
    },
  },
};
