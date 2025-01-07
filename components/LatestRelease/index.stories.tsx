import { ComponentStory, ComponentMeta } from "@storybook/react";
import LatestRelease from ".";

export default {
  title: "old/LatestRelease",
  component: LatestRelease,
} as ComponentMeta<typeof LatestRelease>;

const Template: ComponentStory<typeof LatestRelease> = (args) => (
  <LatestRelease {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
