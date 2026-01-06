import { Meta, StoryObj } from "@storybook/react/*";
import Component from ".";
import { Templates } from "../../../../.storybook/DeckTemplates";

type Story = StoryObj<typeof Component>;

const meta = {
  component: Component,
  title: "New/DeckPage/Hero/Hero",
} as Meta<typeof Component>;

export default meta;

export const Default: Story = Templates.zero;
