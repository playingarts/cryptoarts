import { ComponentMeta, ComponentStory } from "@storybook/react";
import Supply from ".";

export default {
  title: "old/Composed/Supply",
  component: Supply,
} as ComponentMeta<typeof Supply>;

const Template: ComponentStory<typeof Supply> = (args) => <Supply {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  opensea: {
    volume: 4426.475432515725,
    num_owners: "1488",
    floor_price: 0.0059,
    total_supply: "7824",
    on_sale: "85",
    id: "cryptoedition",
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
//                 total_supply: 1200,
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
