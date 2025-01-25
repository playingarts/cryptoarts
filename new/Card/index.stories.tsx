import { Meta, StoryObj } from "@storybook/react/*";
import Component from ".";
import { mockCard } from "../../mocks/card";

type Story = StoryObj<typeof Component>;

const meta = {
  component: Component,
  title: "New/Card/Card",
} as Meta<typeof Component>;

export default meta;

export const Default: Story = {
  args: {
    card: mockCard,
  },
};
