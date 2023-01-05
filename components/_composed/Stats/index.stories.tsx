import { ComponentMeta, ComponentStory } from "@storybook/react";
import Stats from ".";

export default {
  title: "Composed/Stats",
  component: Stats,
} as ComponentMeta<typeof Stats>;

const Template: ComponentStory<typeof Stats> = (args) => <Stats {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  opensea: {
    id: "",
    editors: ["0x85696c8684f13e4ac9399eec92604c03d708f7f2"],
    payment_tokens: [
      {
        id: 13689077,
        symbol: "ETH",
        address: "0x0000000000000000000000000000000000000000",
        image_url:
          "https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg",
        name: "Ether",
        decimals: 18,
        eth_price: 1,
        usd_price: 1248.57,
      },
      {
        id: 4645681,
        symbol: "WETH",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        image_url:
          "https://openseauserdata.com/files/accae6b6fb3888cbff27a013729c22dc.svg",
        name: "Wrapped Ether",
        decimals: 18,
        eth_price: 1,
        usd_price: 1248.57,
      },
      {
        id: 4403908,
        symbol: "USDC",
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        image_url:
          "https://openseauserdata.com/files/749015f009a66abcb3bbb3502ae2f1ce.svg",
        name: "USD Coin",
        decimals: 6,
        eth_price: 0.00080045,
        usd_price: 1,
      },
    ],
    primary_asset_contracts: [
      {
        address: "0xc22616e971a670e72f35570337e562c3e515fbfe",
        asset_contract_type: "non-fungible",
        created_date: "2021-08-18T20:11:44.831375",
        name: "Playing Arts Crypto Edition",
        nft_version: "3.0",
        owner: 61645899,
        schema_name: "ERC721",
        symbol: "PACE",
        total_supply: "0",
        description:
          "A deck of playing cards featuring works of 55 leading artists. Unique digital art collectibles living on the Ethereum blockchain.\n\nhttps://playingarts.com/crypto",
        external_link: "https://playingarts.com/en/crypto",
        image_url:
          "https://i.seadn.io/gcs/files/996280bc022fa72c5be2a3590a2a7fba.png?w=500&auto=format",
        default_to_fiat: false,
        dev_buyer_fee_basis_points: 0,
        dev_seller_fee_basis_points: 500,
        only_proxied_transfers: false,
        opensea_buyer_fee_basis_points: 0,
        opensea_seller_fee_basis_points: 250,
        buyer_fee_basis_points: 0,
        seller_fee_basis_points: 750,
        payout_address: "0xfcfd26569be92b1cf46811bca2d45b0bfc3664c3",
      },
    ],
    traits: {
      Value: {
        "2": 600,
        "3": 600,
        "4": 600,
        "5": 600,
        "6": 600,
        "7": 600,
        "8": 600,
        "9": 600,
        "10": 600,
        ace: 600,
        king: 600,
        queen: 600,
        jack: 600,
        joker: 30,
      },
      Suit: {
        diamonds: 1950,
        hearts: 1950,
        spades: 1950,
        clubs: 1950,
      },
      Color: {
        black: 15,
        red: 15,
      },
    },
    stats: {
      one_day_volume: 0.0108,
      one_day_change: 0,
      one_day_sales: 1,
      one_day_average_price: 0,
      seven_day_volume: 0.20370000000000002,
      seven_day_change: 0.16400000000000037,
      seven_day_sales: 16,
      seven_day_average_price: 0.012731250000000001,
      thirty_day_volume: 0.6701,
      thirty_day_change: -0.18320331545587518,
      thirty_day_sales: 30,
      thirty_day_average_price: 0.022336666666666668,
      total_volume: 4424.030894015663,
      total_sales: 9889,
      total_supply: 7827,
      count: 7827,
      num_owners: 1491,
      average_price: 0.44736888401412306,
      num_reports: 1,
      market_cap: 99.64749375000001,
      floor_price: 0.0188,
    },
    banner_image_url:
      "https://i.seadn.io/gae/xxc2OyGwPMfOe_DT2_rOv35fAbuLx0m3Iy5fEAKNBEWm-yD8tb0UxLFkFbkI6gCsU0E_uIyZAK0B1oYz-wcAL239bh56ZmOkaitUcQ?w=500&auto=format",
    created_date: "2021-08-19T08:54:51.079145+00:00",
    default_to_fiat: false,
    description:
      "A deck of playing cards featuring works of 55 leading artists. Unique digital art collectibles living on the Ethereum blockchain.\n\nhttps://playingarts.com/crypto",
    dev_buyer_fee_basis_points: "0",
    dev_seller_fee_basis_points: "500",
    discord_url: "https://discord.gg/u8gfv2zdG3",
    external_url: "https://playingarts.com/en/crypto",
    featured: false,
    featured_image_url:
      "https://i.seadn.io/gae/xxc2OyGwPMfOe_DT2_rOv35fAbuLx0m3Iy5fEAKNBEWm-yD8tb0UxLFkFbkI6gCsU0E_uIyZAK0B1oYz-wcAL239bh56ZmOkaitUcQ?w=500&auto=format",
    hidden: false,
    safelist_request_status: "verified",
    image_url:
      "https://i.seadn.io/gcs/files/996280bc022fa72c5be2a3590a2a7fba.png?w=500&auto=format",
    is_subject_to_whitelist: false,
    large_image_url:
      "https://i.seadn.io/gae/xxc2OyGwPMfOe_DT2_rOv35fAbuLx0m3Iy5fEAKNBEWm-yD8tb0UxLFkFbkI6gCsU0E_uIyZAK0B1oYz-wcAL239bh56ZmOkaitUcQ?w=500&auto=format",
    name: "Playing Arts Crypto Edition",
    only_proxied_transfers: false,
    opensea_buyer_fee_basis_points: "0",
    opensea_seller_fee_basis_points: "250",
    payout_address: "0xfcfd26569be92b1cf46811bca2d45b0bfc3664c3",
    require_email: false,
    slug: "cryptoedition",
    twitter_username: "playingarts",
    instagram_username: "playingarts",
  },
};
// Primary.parameters = {
//   apolloClient: {
//     mocks: [
//       {
//         delay: 1000,
//         request: {
//           query: OpenseaQuery,
//           variables: {
//             deck: Primary.args.deckId,
//           },
//         },
//         result: {
//           data: {
//             opensea: {
//               stats: {
//                 num_owners: 1200,
//                 total_volume: 123.456,
//                 floor_price: 0.123,
//                 total_supply: 1000,
//                 onSale: 130,
//               },
//             },
//           },
//         },
//       },
//     ],
//   },
// };

export const NoResult = Template.bind({});
// NoResult.parameters = {
//   apolloClient: {
//     mocks: [
//       {
//         delay: 1000,
//         request: {
//           query: OpenseaQuery,
//           variables: {
//             deck: Primary.args.deckId,
//           },
//         },
//         result: {
//           data: {
//             opensea: {
//               stats: {},
//             },
//           },
//         },
//       },
//     ],
//   },
// };
