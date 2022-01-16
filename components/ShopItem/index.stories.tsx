import { ComponentStory, ComponentMeta } from "@storybook/react";
import ShopItem from "./";
import Image from "./images/deck-zero.png";

export default {
  title: "Shop/ShopItem",
  component: ShopItem,
} as ComponentMeta<typeof ShopItem>;

const Template: ComponentStory<typeof ShopItem> = (args) => (
  <ShopItem
    {...args}
    css={(theme) => ({
      color: theme.colors.text_title_light,
    })}
  />
);

export const Primary = Template.bind({});
Primary.args = {
  image: (Image as unknown) as string,
  price: "€14.95",
  name: "Zero",
};
