import { ComponentMeta, ComponentStory } from "@storybook/react";
import PieChart from ".";

export default {
  title: "old/Charts/PieChart",
  component: PieChart,
} as ComponentMeta<typeof PieChart>;

const Template: ComponentStory<typeof PieChart> = (args) => (
  <div css={{ width: 500, height: 300 }}>
    <PieChart {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  dataPoints: [
    { name: "diamonds", value: 7, color: "diamonds" },
    { name: "clubs", value: 15, color: "clubs" },
    { name: "2, 3, 4, ... Ace", value: 20, color: "spades" },
  ],
};
