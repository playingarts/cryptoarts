import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import BlockTitle from "./";
import Button from "../Button";
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
  buttonProps: {
    text: "metamask",
    Icon: Plus,
    textProps: {
      css: (theme) => ({
        background: theme.colors.ethButton,
        backgroundClip: "text",
        color: "transparent",
      }),
    },
    css: (theme) => ({
      background: theme.colors.darkGray,
    }),
  },
};
