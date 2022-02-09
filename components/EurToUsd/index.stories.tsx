import { ComponentStory, ComponentMeta } from "@storybook/react";
import EurToUsd from ".";
import { ConvertEurToUsdQuery } from "../../hooks/product";

export default {
  title: "Shop/EurToUsd",
  component: EurToUsd,
} as ComponentMeta<typeof EurToUsd>;

const Template: ComponentStory<typeof EurToUsd> = (args) => (
  <EurToUsd {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  eur: 5,
};
Primary.parameters = {
  apolloClient: {
    mocks: [
      {
        delay: 1000,
        request: {
          query: ConvertEurToUsdQuery,
          variables: {
            eur: Primary.args.eur,
          },
        },
        result: {
          data: {
            convertEurToUsd: 10,
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
          query: ConvertEurToUsdQuery,
        },
        result: {
          data: {
            convertEurToUsd: null,
          },
        },
      },
    ],
  },
};
