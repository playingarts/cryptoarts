import { ComponentStory, ComponentMeta } from "@storybook/react";
import BrowseCollection from ".";
import { DecksQuery } from "../../../hooks/deck";
import { mockDeck } from "../../../mocks/deck";

export default {
  title: "Composed/BrowseCollection",
  component: BrowseCollection,
} as ComponentMeta<typeof BrowseCollection>;

const Template: ComponentStory<typeof BrowseCollection> = () => (
  <BrowseCollection />
);

export const Primary = Template.bind({});
Primary.parameters = {
  apolloClient: {
    mocks: [
      {
        delay: 1000,
        request: {
          query: DecksQuery,
          variables: {
            withProduct: true,
          },
        },
        result: {
          data: {
            decks: [
              {
                ...mockDeck,
                slug: "1 deck",
                product: {
                  image:
                    "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-zero.png",
                },
              },
              {
                ...mockDeck,
                slug: "deck 2",
                product: {
                  image:
                    "https://s3.amazonaws.com/img.playingarts.com/www/products/deck-one.png",
                },
              },
            ],
          },
        },
      },
    ],
  },
};
