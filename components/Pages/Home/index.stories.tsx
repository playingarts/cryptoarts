import { Meta, StoryObj } from "@storybook/react/*";
import Component from ".";

type Story = StoryObj<typeof Component>;

const meta = {
  title: "New/Home/Home",
  tags: ["autodocs"],
  component: Component,
} as Meta<typeof Component>;

export default meta;

export const Default: Story = {
  parameters: {
    design: {
      type: "figspec",
      url: "https://www.figma.com/design/MDJjecRss6ILUdH6eCcvwQ/Playing-Arts-website-2025-(Copy)?node-id=1158-29568&t=EU2tDVgtU1nZAKfd-4",
    },
  },
};
