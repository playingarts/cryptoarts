import { ComponentStory, ComponentMeta } from "@storybook/react";
import Holders from ".";
import { HoldersQuery } from "../../../hooks/opensea";

export default {
  title: "Composed/Holders",
  component: Holders,
} as ComponentMeta<typeof Holders>;

const Template: ComponentStory<typeof Holders> = (args) => (
  <Holders {...args} css={{ height: 500 }} />
);

export const Primary = Template.bind({});
Primary.args = {
  deck: "deck",
};
Primary.parameters = {
  apolloClient: {
    mocks: [
      {
        delay: 1000,
        request: {
          query: HoldersQuery,
          variables: {
            deck: Primary.args.deck,
          },
        },
        result: {
          data: {
            holders: {
              fullDeck: [
                { jokers: true, user: "" },
                { jokers: false, user: "" },
              ],
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
