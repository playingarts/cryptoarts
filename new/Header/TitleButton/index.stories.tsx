import { Meta, StoryObj } from "@storybook/react/*";
import Component from ".";

type Story = StoryObj<typeof Component>;

const meta = {
  component: Component,
  title: "New/Buttons/TitleButton",
  tags: ["autodocs"],
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  // args: {
  //   ...ActionsData,
  // },
} as Meta<typeof Component>;

export default meta;

export const Default: Story = {
  args: {
    children: "Button",
  },
};
