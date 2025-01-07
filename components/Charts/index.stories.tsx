import { ComponentMeta, ComponentStory } from "@storybook/react";
import { format } from "date-fns";
import { Fragment } from "react";
import Charts from ".";
import Clubs from "../Icons/Clubs";
import Diamonds from "../Icons/Diamonds";
import Hearts from "../Icons/Hearts";
import Spades from "../Icons/Spades";

export default {
  title: "old/Charts/Charts",
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
    { name: "diamonds", value: 7, color: "diamonds" },
    { name: "clubs", value: 15, color: "clubs" },
    { name: "2, 3, 4, ... Ace", value: 20, color: "spades" },
  ],
};

export const Column = Template.bind({});
Column.args = {
  type: "column",
  dataPoints: [
    { name: "spades", value: 42, color: "red", icon: <Spades /> },
    { name: "hearts", value: 41, color: "green", icon: <Hearts /> },
    { name: "clubs", value: 43, color: "red", icon: <Clubs /> },
    { name: "diamonds", value: 46, color: "red", icon: <Diamonds /> },
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
    { name: "diamonds", value: 7, color: "diamonds" },
    { name: "clubs", value: 15, color: "clubs" },
    { name: "2, 3, 4, ... Ace", value: 20, color: "spades" },
  ],
  withTooltip: true,
};

export const WithFormattedTooltip = Template.bind({});
WithFormattedTooltip.args = {
  type: "pie",
  dataPoints: [
    { name: "diamonds", value: 7, color: "diamonds" },
    { name: "clubs", value: 15, color: "clubs" },
    { name: "2, 3, 4, ... Ace", value: 20, color: "spades" },
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
    { name: "spades", value: 42, color: "spades", icon: <Spades /> },
    { name: "hearts", value: 41, color: "hearts", icon: <Hearts /> },
    { name: "clubs", value: 43, color: "clubs", icon: <Clubs /> },
    {
      name: "diamonds",
      value: 46,
      color: "diamonds",
      icon: <Diamonds />,
    },
  ],
};
