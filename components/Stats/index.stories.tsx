import { ComponentStory, ComponentMeta } from "@storybook/react";
import Stats from ".";

export default {
  title: "Stats",
  component: Stats,
} as ComponentMeta<typeof Stats>;

const Template: ComponentStory<typeof Stats> = (args) => (
  <Stats
    {...args}
    css={(theme) => ({
      background: theme.colors.dark_gray,
      color: theme.colors.text_title_light,
    })}
  />
);

export const Primary = Template.bind({});
Primary.args = {
  allLink: "/",
  totalHolders: "401k",
  totalVolume: "401k",
  floorPrice: ".012",
};
