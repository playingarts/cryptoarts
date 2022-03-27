import { ComponentStory, ComponentMeta } from "@storybook/react";
import Supply from ".";
import { OpenseaQuery } from "../../../hooks/opensea";
import { mockDeck } from "../../../mocks/deck";

export default {
  title: "Composed/Supply",
  component: Supply,
} as ComponentMeta<typeof Supply>;

const Template: ComponentStory<typeof Supply> = (args) => <Supply {...args} />;

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
                total_supply: 1200,
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
