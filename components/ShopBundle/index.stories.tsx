import { ComponentStory, ComponentMeta } from "@storybook/react";
import Bundle from ".";

export default {
  title: "Shop/Bundle",
  component: Bundle,
} as ComponentMeta<typeof Bundle>;

const Template: ComponentStory<typeof Bundle> = (args) => <Bundle {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  name: "3x Editions Bundle",
  price: "€34.95",
  image:
    "https://t3.ftcdn.net/jpg/03/76/74/78/240_F_376747823_L8il80K6c2CM1lnPYJhhJZQNl6ynX1yj.jpg",
};

const StretchedTemplate: ComponentStory<typeof Bundle> = (args) => (
  <div css={{ height: 500, display: "flex" }}>
    <Bundle {...args} />
  </div>
);
export const Stretched = StretchedTemplate.bind({});
Stretched.args = {
  name: "3x Editions Bundle",
  price: "€34.95",
  image:
    "https://t3.ftcdn.net/jpg/03/76/74/78/240_F_376747823_L8il80K6c2CM1lnPYJhhJZQNl6ynX1yj.jpg",
};
