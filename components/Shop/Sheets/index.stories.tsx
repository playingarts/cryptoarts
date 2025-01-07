import { ComponentStory, ComponentMeta } from "@storybook/react";
import ShopSheets from ".";

export default {
  title: "old/Shop/Sheets",
  component: ShopSheets,
} as ComponentMeta<typeof ShopSheets>;

const Template: ComponentStory<typeof ShopSheets> = (args) => (
  <ShopSheets {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  products: [
    {
      _id: "",
      title: "Edition Zero",
      price: { eur: 34.95, usd: 39.95 },
      image:
        "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-zero.png",
      info: "Uncut Sheet",
      status: "status",
      type: "type",
      image2: "image2",
      short: "short",
    },
    {
      _id: "",
      title: "Edition One",
      price: { eur: 34.95, usd: 39.95 },
      image:
        "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-one.png",
      info: "Uncut Sheet",
      status: "status",
      type: "type",
      image2: "image2",
      short: "short",
    },
    {
      _id: "",
      title: "Edition Two",
      price: { eur: 34.95, usd: 39.95 },
      image:
        "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-two.png",
      info: "Uncut Sheet",
      status: "status",
      type: "type",
      image2: "image2",
      short: "short",
    },
    {
      _id: "",
      title: "Edition Three",
      price: { eur: 34.95, usd: 39.95 },
      image:
        "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-three.png",
      info: "Uncut Sheet",
      status: "status",
      type: "type",
      image2: "image2",
      short: "short",
    },
    {
      _id: "",
      title: "Special Edition",
      price: { eur: 34.95, usd: 39.95 },
      image:
        "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-special.png",
      info: "Uncut Sheet",
      status: "status",
      type: "type",
      image2: "image2",
      short: "short",
    },
    {
      _id: "",
      title: "Future Edition I",
      price: { eur: 34.95, usd: 39.95 },
      image:
        "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-future-i.png",
      info: "Uncut Sheet",
      status: "status",
      type: "type",
      image2: "image2",
      short: "short",
    },
    {
      _id: "",
      title: "Future Edition II",
      price: { eur: 34.95, usd: 39.95 },
      image:
        "https://s3.amazonaws.com/img.playingarts.com/www/products/uncut-future-ii.png",
      info: "Uncut Sheet",
      status: "status",
      type: "type",
      image2: "image2",
      short: "short",
    },
  ],
};
