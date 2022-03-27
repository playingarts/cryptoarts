import { ComponentStory, ComponentMeta } from "@storybook/react";
import Holders from ".";
import { HoldersQuery } from "../../../hooks/opensea";
import { mockDeck } from "../../../mocks/deck";

export default {
  title: "Composed/Holders",
  component: Holders,
} as ComponentMeta<typeof Holders>;

const Template: ComponentStory<typeof Holders> = (args) => (
  <Holders {...args} css={{ height: 500 }} />
);

export const Primary = Template.bind({});
Primary.args = {
  contract: mockDeck.openseaContract,
};
Primary.parameters = {
  apolloClient: {
    mocks: [
      {
        delay: 1000,
        request: {
          query: HoldersQuery,
          variables: {
            contract: Primary.args.contract,
          },
        },
        result: {
          data: {
            holders: {
              fullDecks: ["1", "2"],
              fullDecksWithJokers: ["1"],
              spades: ["1", "2"],
              hearts: ["1"],
              diamonds: ["1", "2", "3", "4"],
              clubs: [],
            },
          },
        },
      },
    ],
  },
};
