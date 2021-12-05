import { ComponentStory, ComponentMeta } from "@storybook/react";
import BlockTitle from "./";
import Plus from "../Icons/Plus";

export default {
  title: "CardBlock/BlockTitle",
  component: BlockTitle,
} as ComponentMeta<typeof BlockTitle>;

const Template: ComponentStory<typeof BlockTitle> = (args) => (
  <BlockTitle {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  titleText: "Title Text",
  subTitleText: "Subtitle text",
};

export const WithButton = Template.bind({});
WithButton.args = {
  ...Primary.args,
  variant: "h3",
  buttonProps: {
    children: (
      <span
        css={(theme) => ({
          background: theme.colors.gradient,
          backgroundClip: "text",
          color: "transparent",
        })}
      >
        metamask
      </span>
    ),
    Icon: Plus,
    css: (theme) => ({
      background: theme.colors.dark_gray,
      color: "#82A7F8",
    }),
  },
};
