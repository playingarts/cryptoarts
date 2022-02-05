import { ComponentStory, ComponentMeta } from "@storybook/react";
import ShopSheets from ".";

export default {
  title: "Shop/Sheets",
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
      price: 34.95,
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
      price: 34.95,
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
      price: 34.95,
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
      price: 34.95,
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
      price: 34.95,
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
      price: 34.95,
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
      price: 34.95,
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
