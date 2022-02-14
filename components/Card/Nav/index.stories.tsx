import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardNav from ".";

export default {
  title: "Card/Nav",
  component: CardNav,
} as ComponentMeta<typeof CardNav>;

const Template: ComponentStory<typeof CardNav> = (args) => (
  <CardNav {...args}>
    <div
      css={{
        height: "100vh",
      }}
    />
  </CardNav>
);

export const Primary = Template.bind({});
Primary.args = {};

export const WithLinks = Template.bind({});
WithLinks.args = {
  prevLink: "/prev",
  nextLink: "/next",
  closeLink: "/close",
};
