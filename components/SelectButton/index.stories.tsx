import { ComponentMeta, ComponentStory } from "@storybook/react";
import Component from ".";
import defaultSort from "../Icons/DefaultSort";
import Sort from "../Icons/Sort";

export default {
  title: "old/Buttons/SelectButton",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => {
  return (
    <Component
      {...args}
      css={(theme) => [
        {
          [theme.maxMQ.sm]: {
            "--buttonHeight": `${theme.spacing(4.2)}px`,
            "--buttonWidth": `${theme.spacing(4.2)}px`,
          },
          [theme.mq.sm]: {
            "--buttonHeight": `${theme.spacing(5)}px`,
            "--buttonWidth": `${theme.spacing(5)}px`,
          },
        },
      ]}
    />
  );
};

const commonArgs = {
  states: [
    {
      children: "default",
      Icon: defaultSort,
    },
    {
      Icon: Sort,
      IconProps: { css: { transform: "scaleY(-1)" } },
      children: "ascending",
    },
    { Icon: Sort, children: "descending" },
  ],
};

export const Light = Template.bind({});

Light.args = commonArgs;

export const NoText = Template.bind({});

NoText.args = { ...commonArgs, noText: true };
