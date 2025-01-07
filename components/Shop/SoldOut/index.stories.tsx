import { ComponentStory, ComponentMeta } from "@storybook/react";
import ShopSoldOut from ".";

export default {
  title: "old/Shop/SoldOut",
  component: ShopSoldOut,
} as ComponentMeta<typeof ShopSoldOut>;

const Template: ComponentStory<typeof ShopSoldOut> = (args) => (
  <ShopSoldOut {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  title: "Special Edition",
};
