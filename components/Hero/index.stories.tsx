import { ComponentStory, ComponentMeta } from "@storybook/react";
import Hero from ".";

export default {
  title: "Hero",
  component: Hero,
} as ComponentMeta<typeof Hero>;

const Template: ComponentStory<typeof Hero> = (args) => <Hero {...args} />;

export const Primary = Template.bind({});
