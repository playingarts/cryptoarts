import { ComponentStory, ComponentMeta } from "@storybook/react";
import Bag from "../Icons/Bag";
import Bell from "../Icons/Bell";
import Link from "../Link";
import Component from "./";

export default {
  title: "Button - Link",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
);

export const ButtonPrimary = Template.bind({});
ButtonPrimary.args = {
  children: "Text Label",
};

export const ButtonWithIcon = Template.bind({});
ButtonWithIcon.args = {
  children: "With Icon",
  Icon: Bag,
};

export const ButtonIcon = Template.bind({});
ButtonIcon.args = {
  Icon: Bell,
};

export const ButtonLoading = Template.bind({});
ButtonLoading.args = {
  Icon: Bell,
  children: "With Icon",
  loading: true,
};

export const LinkPrimary = Template.bind({});
LinkPrimary.args = {
  component: Link,
  href: "/",
  children: "Text Label",
};

export const LinkWithIcon = Template.bind({});
LinkWithIcon.args = {
  component: Link,
  href: "/",
  children: "With Icon",
  Icon: Bag,
};

export const LinkIcon = Template.bind({});
LinkIcon.args = {
  component: Link,
  href: "/",
  Icon: Bell,
};

export const LinkLoading = Template.bind({});
LinkLoading.args = {
  component: Link,
  href: "/",
  Icon: Bell,
  children: "With Icon",
  loading: true,
};
