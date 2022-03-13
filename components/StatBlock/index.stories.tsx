import { ComponentStory, ComponentMeta } from "@storybook/react";
import StatBlock from ".";
import Button from "../Button";
import Stat from "../Stat";

export default {
  title: "StatBlock",
  component: StatBlock,
} as ComponentMeta<typeof StatBlock>;

const Template: ComponentStory<typeof StatBlock> = (args) => (
  <StatBlock
    {...args}
    css={(theme) => ({
      background: theme.colors.dark_gray,
      color: theme.colors.text_title_light,
    })}
  />
);

export const Primary = Template.bind({});
Primary.args = {
  title: "Stats",
  children: <Stat label="Label" value="value" />,
};

export const ActionButton = Template.bind({});
ActionButton.args = {
  title: "Stats",
  children: <Stat label="Label" value="value" />,
  action: <Button>Button</Button>,
};

const StretchedTemplate: ComponentStory<typeof StatBlock> = (args) => (
  <div css={{ height: 500, display: "flex" }}>
    <StatBlock
      {...args}
      css={(theme) => ({
        flexGrow: 1,
        background: theme.colors.dark_gray,
        color: theme.colors.text_title_light,
      })}
    />
  </div>
);

export const Stretched = StretchedTemplate.bind({});
Stretched.args = {
  ...Primary.args,
  action: {
    children: "All tokens",
    href: "/",
  },
};
