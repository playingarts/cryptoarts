import { ComponentStory, ComponentMeta } from "@storybook/react";
import Hero from ".";

export default {
  title: "Hero",
  component: Hero,
} as ComponentMeta<typeof Hero>;

const Template: ComponentStory<typeof Hero> = (args) => <Hero {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: "Collective Art Project",
  text:
    "For creative people who are into art, playing cards and sometimes magic.",
};
