import { ComponentStory, ComponentMeta } from "@storybook/react";
import { format } from "date-fns";
import { Fragment } from "react";
import Charts from ".";
import { theme } from "../../pages/_app";
import Clubs from "../Icons/Clubs";
import Diamonds from "../Icons/Diamonds";
import Hearts from "../Icons/Hearts";
import Spades from "../Icons/Spades";

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

export const Column = Template.bind({});
Column.args = {
  type: "column",
  dataPoints: [
    { name: "spades", value: 42, color: "red", icon: <Spades /> },
    { name: "hearts", value: 41, color: "green", icon: <Hearts /> },
    { name: "clubs", value: 43, color: "blue", icon: <Clubs /> },
    { name: "diamonds", value: 46, color: "purple", icon: <Diamonds /> },
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

export const ColumnWithTooltip = Template.bind({});
ColumnWithTooltip.args = {
  type: "column",
  withTooltip: true,
  dataPoints: [
    { name: "spades", value: 42, color: theme.colors.spades, icon: <Spades /> },
    { name: "hearts", value: 41, color: theme.colors.hearts, icon: <Hearts /> },
    { name: "clubs", value: 43, color: theme.colors.clubs, icon: <Clubs /> },
    {
      name: "diamonds",
      value: 46,
      color: theme.colors.diamonds,
      icon: <Diamonds />,
    },
  ],
};
