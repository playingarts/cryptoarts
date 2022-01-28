import { ComponentStory, ComponentMeta } from "@storybook/react";
import { format } from "date-fns";
import { Fragment } from "react";
import Charts from ".";
import { theme } from "../../pages/_app";

export default {
  title: "Charts/Charts",
  component: Charts,
} as ComponentMeta<typeof Charts>;

const Template: ComponentStory<typeof Charts> = (args) => (
  <div css={{ width: 500, height: 300 }}>
    <Charts {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  type: "pie",
  dataPoints: [
    { name: "diamonds", value: 7, color: theme.colors.diamonds },
    { name: "clubs", value: 15, color: theme.colors.clubs },
    { name: "2, 3, 4, ... Ace", value: 20, color: theme.colors.spades },
  ],
};

export const Line = Template.bind({});
Line.args = {
  type: "line",
  dataPoints: Array.from({ length: 10 }).map((_, index, array) => ({
    name: Date.now() - 1000 * 60 * 60 * 24 * 7 * (array.length - 1 - index),
    value:
      index === 0
        ? 0
        : index === array.length - 1
        ? 100
        : parseInt(String(Math.random() * 100), 10),
  })),
  LabelFormatter: function LabelFormatter({ name }) {
    return <Fragment>{format(name as number, "MM/dd")}</Fragment>;
  },
};

export const WithTooltip = Template.bind({});
WithTooltip.args = {
  type: "pie",
  dataPoints: [
    { name: "diamonds", value: 7, color: theme.colors.diamonds },
    { name: "clubs", value: 15, color: theme.colors.clubs },
    { name: "2, 3, 4, ... Ace", value: 20, color: theme.colors.spades },
  ],
  withTooltip: true,
};

export const WithFormattedTooltip = Template.bind({});
WithFormattedTooltip.args = {
  type: "pie",
  dataPoints: [
    { name: "diamonds", value: 7, color: theme.colors.diamonds },
    { name: "clubs", value: 15, color: theme.colors.clubs },
    { name: "2, 3, 4, ... Ace", value: 20, color: theme.colors.spades },
  ],
  withTooltip: true,
  TooltipFormatter({ name, value }) {
    return (
      <Fragment>
        {name}: {value} copies
      </Fragment>
    );
  },
};
