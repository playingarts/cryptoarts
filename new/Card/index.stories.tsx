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
  parameters: {
    design: {
      type: "figspec",
      url: "https://www.figma.com/design/MDJjecRss6ILUdH6eCcvwQ/Playing-Arts-website-2025-(Copy)?node-id=795-42007&t=MrS8kbrC4j2Lixr9-4",
    },
  },
};
