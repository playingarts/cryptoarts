import { Meta, StoryObj } from "@storybook/react/*";
import Component from ".";
import { handlers } from "../../../.storybook/StoryGraphqlHandlers";
import { HttpResponse, graphql } from "msw";
import { mockDecks } from "../../../mocks/DecksQuery";
import { Templates } from "../../../.storybook/DeckTemplates";

type Story = StoryObj<typeof Component>;

const meta = {
  component: Component,
  title: "New/DeckPage/Deck",
} as Meta<typeof Component>;

export default meta;

export const Default: Story = Templates.zero;
