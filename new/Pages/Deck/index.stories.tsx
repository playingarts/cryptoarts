import { Meta, StoryObj } from "@storybook/react/*";
import Component from ".";
import { handlers } from "../../../.storybook/StoryGraphqlHandlers";

type Story = StoryObj<typeof Component>;

const meta = {
  component: Component,
  title: "New/DeckPage/Deck",
} as Meta<typeof Component>;

export default meta;

export const Default: Story = {
  parameters: {
    nextjs: {
      router: {
        pathname: "/[deckId]]",
        asPath: "/zero",
        query: {
          deckId: "zero",
        },
      },
    },
  },
};
