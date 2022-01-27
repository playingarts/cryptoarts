import { ComponentStory, ComponentMeta } from "@storybook/react";
import PieChart from ".";
import { theme } from "../../../pages/_app";

export default {
  title: "Charts/PieChart",
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
    { name: "diamonds", value: 7, color: theme.colors.diamonds },
    { name: "clubs", value: 15, color: theme.colors.clubs },
    { name: "2, 3, 4, ... Ace", value: 20, color: theme.colors.spades },
  ],
};
