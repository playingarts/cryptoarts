import { ComponentStory, ComponentMeta } from "@storybook/react";
import AugmentedReality from "./";

export default {
  title: "old/AugmentedReality",
  component: AugmentedReality,
} as ComponentMeta<typeof AugmentedReality>;

const Template: ComponentStory<typeof AugmentedReality> = (args) => (
  <AugmentedReality {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
