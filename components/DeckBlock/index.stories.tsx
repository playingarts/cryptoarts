import { ComponentStory, ComponentMeta } from "@storybook/react";
import { mockDeck } from "../../mocks/deck";
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
  deck: mockDeck,
};
