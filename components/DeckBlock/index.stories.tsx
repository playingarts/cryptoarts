import { ComponentStory, ComponentMeta } from "@storybook/react";
import DeckBlock from "./";

export default {
  title: "DeckBlock",
  component: DeckBlock,
} as ComponentMeta<typeof DeckBlock>;

const Template: ComponentStory<typeof DeckBlock> = (args) => (
  <DeckBlock {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  properties: {
    size: "Poker, 88.9 × 63.5mm",
    material: "Bicycle® paper with Air-cushion finish",
    inside: "52 Playing cards + 2 Jokers + Info card",
  },
};
