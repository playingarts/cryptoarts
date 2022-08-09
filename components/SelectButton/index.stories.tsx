import { ComponentMeta, ComponentStory } from "@storybook/react";
import Component from ".";

export default {
  title: "Buttons/SelectButton",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
);

const commonArgs = {
  states: ["default", "ascending", "descending"],
};

export const Light = Template.bind({});

Light.args = commonArgs;

export const Dark = Template.bind({});

Dark.args = { ...commonArgs, palette: "dark" };
