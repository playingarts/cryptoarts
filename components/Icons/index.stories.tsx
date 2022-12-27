import { ComponentMeta, ComponentStory } from "@storybook/react";
import LogoIcon from "./Logo";
import MenuIcon from "./Menu";

export default {
  title: "Icons",
  component: LogoIcon,
} as ComponentMeta<typeof LogoIcon>;

const LogoTemplate: ComponentStory<typeof LogoIcon> = (args) => (
  <LogoIcon {...args} />
);

export const Logo = LogoTemplate.bind({});

const MenuTemplate: ComponentStory<typeof MenuIcon> = (args) => (
  <MenuIcon {...args} animateOnHover={true} />
);

export const Menu = MenuTemplate.bind({});
