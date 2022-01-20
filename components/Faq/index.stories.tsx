import { ComponentStory, ComponentMeta } from "@storybook/react";
import Faq from ".";

export default {
  title: "FAQ",
  component: Faq,
} as ComponentMeta<typeof Faq>;

const Template: ComponentStory<typeof Faq> = (args) => <Faq {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
