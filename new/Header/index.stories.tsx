import Component from ".";
import { Meta, StoryObj } from "@storybook/react";
import { HttpResponse, graphql } from "msw";
import { mockDeck } from "../../mocks/deck";

type Story = StoryObj<typeof Component>;

const meta = {
  title: "new/Header/Header",
  tags: ["autodocs"],
  component: Component,
} as Meta<typeof Component>;

export default meta;

export const MainPageHeader: Story = {};

export const DeckPageHeader: Story = {
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
    msw: {
      handlers: [
        graphql.query("Deck", () =>
          HttpResponse.json({
            data: { deck: { ...mockDeck, title: "Zero" } },
          })
        ),
      ],
    },
  },
};
