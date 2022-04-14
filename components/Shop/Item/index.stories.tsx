import { ComponentStory, ComponentMeta } from "@storybook/react";
import ShopItem from ".";

export default {
  title: "Shop/Item",
  component: ShopItem,
} as ComponentMeta<typeof ShopItem>;

const Template: ComponentStory<typeof ShopItem> = (args) => (
  <div css={(theme) => ({ color: theme.colors.text_title_light })}>
    <ShopItem {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  image:
    "https://t3.ftcdn.net/jpg/03/76/74/78/240_F_376747823_L8il80K6c2CM1lnPYJhhJZQNl6ynX1yj.jpg",
  price: 14.95,
  short: "Zero",
};

const StretchedTemplate: ComponentStory<typeof ShopItem> = (args) => (
  <div css={{ height: 500, display: "flex" }}>
    <ShopItem {...args} />
  </div>
);
export const StretchedDark = StretchedTemplate.bind({});
StretchedDark.args = {
  image:
    "https://t3.ftcdn.net/jpg/03/76/74/78/240_F_376747823_L8il80K6c2CM1lnPYJhhJZQNl6ynX1yj.jpg",
  price: 14.95,
  short: "Zero",
};
