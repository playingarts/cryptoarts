import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardInfo from ".";
import { CardQuery } from "../../../hooks/card";
import { mockDeck } from "../../../mocks/deck";

export default {
  title: "Card/Info",
  component: CardInfo,
} as ComponentMeta<typeof CardInfo>;

const Template: ComponentStory<typeof CardInfo> = (args) => (
  <CardInfo {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  artist: {
    _id: "",
    name: "Victor Vector",
    slug: "",
    userpic: "",
    social: {},
  },
  deck: mockDeck,
};

const TemplateBlack: ComponentStory<typeof CardInfo> = (args) => (
  <div css={{ background: "#000", color: "#FFF" }}>
    <CardInfo {...args} />
  </div>
);

export const WithPrice = TemplateBlack.bind({});
WithPrice.args = {
  ...Primary.args,
  deck: {
    ...mockDeck,
    slug: "crypto",
  },
  cardId: "cardId",
};
WithPrice.parameters = {
  apolloClient: {
    mocks: [
      {
        delay: 1000,
        request: {
          query: CardQuery,
          variables: {
            id: "artistId",
          },
        },
        result: {
          data: {
            card: {
              _id: "artistId",
              price: "10.00",
            },
          },
        },
      },
    ],
  },
};
