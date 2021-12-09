import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from ".";

export default {
  title: "Quote",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  children:
    "“Two is a sign of union. And diamonds are a sign of prosperity. I wanted to show the duality using my Ugly character wearing a twofaced mask.”",
};

export const WithProps = Template.bind({});
WithProps.args = {
  children:
    "“Two is a sign of union. And diamonds are a sign of prosperity. I wanted to show the duality using my Ugly character wearing a twofaced mask.”",
  withLine: true,
  moreLink: "/more",
  artist: {
    _id: "",
    userpic: "",
    slug: "",
    social: {},
    name: "victor vector",
  },
};
