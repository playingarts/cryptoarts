import { ComponentStory, ComponentMeta } from "@storybook/react";
import MainMenu from ".";

export default {
  title: "Header/MainMenu",
  component: MainMenu,
} as ComponentMeta<typeof MainMenu>;

const Template: ComponentStory<typeof MainMenu> = (args) => (
  <MainMenu {...args} />
);

export const Primary = Template.bind({});

export const Dark = Template.bind({});
Dark.args = {
  palette: "dark",
};
