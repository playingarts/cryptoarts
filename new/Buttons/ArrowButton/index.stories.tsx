import { Meta, StoryObj } from "@storybook/react/*";
import Component from ".";

type Story = StoryObj<typeof Component>;

const meta = {
  component: Component,
  title: "New/Buttons/ArrowButton",
  tags: ["autodocs"],
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  // args: {
  //   ...ActionsData,
  // },
  parameters: {
    design: {
      type: "figspec",
      url: "https://www.figma.com/design/MDJjecRss6ILUdH6eCcvwQ/Playing-Arts-website-2025-(Copy)?node-id=3014-37610&t=VZTjZEeVPXCWxLko-4",
    },
  },

  args: {
    children: "Button-b",
  },
} as Meta<typeof Component>;

export default meta;

export const Default: Story = {};

export const Border: Story = {
  args: {
    bordered: true,
  },
};
