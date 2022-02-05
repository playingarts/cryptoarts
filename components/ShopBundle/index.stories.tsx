import { ComponentStory, ComponentMeta } from "@storybook/react";
import ShopBundle from ".";

export default {
  title: "Shop/Bundle",
  component: ShopBundle,
} as ComponentMeta<typeof ShopBundle>;

const Template: ComponentStory<typeof ShopBundle> = (args) => (
  <ShopBundle {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  title: "3x Editions Bundle",
  price: 34.95,
  image:
    "https://t3.ftcdn.net/jpg/03/76/74/78/240_F_376747823_L8il80K6c2CM1lnPYJhhJZQNl6ynX1yj.jpg",
};

const StretchedTemplate: ComponentStory<typeof ShopBundle> = (args) => (
  <div css={{ height: 500, display: "flex" }}>
    <ShopBundle {...args} />
  </div>
);
export const Stretched = StretchedTemplate.bind({});
Stretched.args = {
  title: "3x Editions Bundle",
  price: 34.95,
  image:
    "https://t3.ftcdn.net/jpg/03/76/74/78/240_F_376747823_L8il80K6c2CM1lnPYJhhJZQNl6ynX1yj.jpg",
};
