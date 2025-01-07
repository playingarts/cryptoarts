import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MetaMaskProvider } from "metamask-react";
import NFTHolder from ".";
import { SignatureProvider } from "../../contexts/SignatureContext";
import { DealQuery } from "../../hooks/deal";
import { ProductsQuery } from "../../hooks/product";

export default {
  title: "old/NFTHolder",
  component: NFTHolder,
} as ComponentMeta<typeof NFTHolder>;

const Template: ComponentStory<typeof NFTHolder> = (args) => (
  <MetaMaskProvider>
    <SignatureProvider>
      <NFTHolder {...args} />
    </SignatureProvider>
  </MetaMaskProvider>
);

const products = [
  {
    _id: "000000000042583867687099",
    title: "Test Edition",
    short: "1",
    info: "1",
    status: "soon",
    type: "deck",
    price: 5,
    image: "",
    image2: "",
    deck: {
      _id: "1",
      slug: "crypto",
      openseaCollection: {
        name: "1",
        address: "1",
      },
    },
  },
];

export const Primary = Template.bind({});
Primary.args = {};
Primary.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: DealQuery,
          variables: {
            signature: "1",
            hash: "1",
            deckId: "1",
          },
        },
        result: {
          data: {
            deal: {
              _id: "1",
              code: "code",
              hash: "1",
              decks: 3,
              deck: {
                slug: "1",
              },
            },
          },
        },
      },
      {
        request: {
          query: ProductsQuery,
        },
        result: {
          data: {
            products,
          },
        },
      },
    ],
  },
};

export const Discount = Template.bind({});
Discount.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: DealQuery,
          variables: {
            signature: "1",
            hash: "1",
            deckId: "1",
          },
        },
        result: {
          data: {
            deal: {
              _id: "discountCode",
              code: "code",
              hash: "1",
              decks: 1,
              deck: {
                slug: "1",
              },
            },
          },
        },
      },
      {
        request: {
          query: ProductsQuery,
        },
        result: {
          data: {
            products,
          },
        },
      },
    ],
  },
};

export const NoNFT = Template.bind({});
NoNFT.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: DealQuery,
          variables: {
            signature: "1",
            hash: "1",
            deckId: "1",
          },
        },
        result: {
          data: {
            deal: null,
          },
        },
      },
      {
        request: {
          query: ProductsQuery,
        },
        result: {
          data: {
            products,
          },
        },
      },
    ],
  },
};

export const Error = Template.bind({});
Error.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: DealQuery,
          variables: {
            signature: "1",
            hash: "1",
            deckId: "11",
          },
        },
        result: {
          data: {
            deal: null,
          },
        },
      },
      {
        request: {
          query: ProductsQuery,
        },
        result: {
          data: {
            products,
          },
        },
      },
    ],
  },
};
