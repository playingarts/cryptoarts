import { Meta, StoryObj } from "@storybook/react/*";
import Component from ".";

type Story = StoryObj<typeof Component>;

const meta = {
  component: Component,
  title: "New/Home/Story/Story",
} as Meta<typeof Component>;

export default meta;

export const Default: Story = {};
