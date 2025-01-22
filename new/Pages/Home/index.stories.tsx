import { Meta, StoryObj } from "@storybook/react/*";
import Component from ".";

type Story = StoryObj<typeof Component>;

const meta = {
  title: "New/Home/Home",
  tags: ["autodocs"],
  component: Component,
} as Meta<typeof Component>;

export default meta;

export const Default: Story = {};
