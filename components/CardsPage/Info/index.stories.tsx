import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardInfo from ".";

export default {
  title: "Cards/Info",
  component: CardInfo,
} as ComponentMeta<typeof CardInfo>;

const Template: ComponentStory<typeof CardInfo> = (args) => (
  <CardInfo {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  author: "Victor Vector",
  location: "Russia",
};

const TemplateBlack: ComponentStory<typeof CardInfo> = (args) => (
  <div css={{ background: "#000", color: "#FFF" }}>
    <CardInfo {...args} />
  </div>
);

export const WithPrice = TemplateBlack.bind({});
WithPrice.args = {
  ...Primary.args,
  price: 0.275,
};
