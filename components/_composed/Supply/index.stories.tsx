import { ComponentStory, ComponentMeta } from "@storybook/react";
import Supply from ".";
import { OpenseaQuery } from "../../../hooks/opensea";

export default {
  title: "Composed/Supply",
  component: Supply,
} as ComponentMeta<typeof Supply>;

const Template: ComponentStory<typeof Supply> = (args) => <Supply {...args} />;

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
          query: OpenseaQuery,
          variables: {
            deck: Primary.args.deck,
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
            deck: Primary.args.deck,
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
