import { ComponentStory, ComponentMeta } from "@storybook/react";
import Stats from ".";
import { OpenseaQuery } from "../../../hooks/opensea";
import { mockDeck } from "../../../mocks/deck";

export default {
  title: "Composed/Stats",
  component: Stats,
} as ComponentMeta<typeof Stats>;

const Template: ComponentStory<typeof Stats> = (args) => <Stats {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  collection: mockDeck.openseaCollection,
};
Primary.parameters = {
  apolloClient: {
    mocks: [
      {
        delay: 1000,
        request: {
          query: OpenseaQuery,
          variables: {
            collection: Primary.args.collection,
          },
        },
        result: {
          data: {
            opensea: {
              stats: {
                num_owners: 1200,
                total_volume: 123.456,
                floor_price: 0.123,
              },
            },
          },
        },
      },
    ],
  },
};

export const NoResult = Template.bind({});
NoResult.parameters = {
  apolloClient: {
    mocks: [
      {
        delay: 1000,
        request: {
          query: OpenseaQuery,
          variables: {
            collection: Primary.args.collection,
          },
        },
        result: {
          data: {
            opensea: {
              stats: {},
            },
          },
        },
      },
    ],
  },
};
