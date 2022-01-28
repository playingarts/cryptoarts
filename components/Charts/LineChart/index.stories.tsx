import { ComponentStory, ComponentMeta } from "@storybook/react";
import { format } from "date-fns";
import { Fragment } from "react";
import LineChart from ".";

export default {
  title: "Charts/LineChart",
  component: LineChart,
} as ComponentMeta<typeof LineChart>;

const Template: ComponentStory<typeof LineChart> = (args) => (
  <div css={{ height: 400 }}>
    <LineChart {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
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
