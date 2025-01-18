import { Meta, StoryObj } from "@storybook/react/*";
import Component from ".";

type Story = StoryObj<typeof Component>;

const meta = {
  component: Component,
  title: "New/Footer",
  decorators: (Story) => (
    <div css={[{ marginTop: 50 }]}>
      <Story />
    </div>
  ),
} as Meta<typeof Component>;

export default meta;

export const Default: Story = {};
