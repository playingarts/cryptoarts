import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Fragment } from "react";
import ShopCheckoutItem from ".";

export default {
  title: "Shop/CheckoutItem",
  component: ShopCheckoutItem,
} as ComponentMeta<typeof ShopCheckoutItem>;

const Template: ComponentStory<typeof ShopCheckoutItem> = (args) => (
  <ShopCheckoutItem {...args} />
);

export const Total = Template.bind({});
Total.args = {
  title: "Total (incl. taxes)",
  price: 10,
  info2: `~${(10 * 1.13).toFixed(2)} USD`,
  priceVariant: "h4",
};

export const Shipping = Template.bind({});
Shipping.args = {
  title: "Shipping and handling",
  price: 5,
  titleVariant: "h5",
  info: (
    <Fragment>
      Your order will be dispatched in 2 to 5 days. Free delivery for orders
      over €69. Enjoy!
    </Fragment>
  ),
};

export const Item = Template.bind({});
Item.args = {
  image:
    "https://s3.amazonaws.com/img.playingarts.com/files/store-bag/future-case.jpg",
  info: "Random thing",
  price: 10,
  title: "Stuff",
  quantity: 2,
  remove: () => null,
  changeQuantity: () => null,
};
