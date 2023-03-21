import { ComponentMeta, ComponentStory } from "@storybook/react";
import ColumnChart from ".";
import Clubs from "../../Icons/Clubs";
import Diamonds from "../../Icons/Diamonds";
import Hearts from "../../Icons/Hearts";
import Spades from "../../Icons/Spades";

export default {
  title: "Charts/ColumnChart",
  component: ColumnChart,
} as ComponentMeta<typeof ColumnChart>;

const Template: ComponentStory<typeof ColumnChart> = (args) => (
  <div css={{ height: 250 }}>
    <ColumnChart {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  dataPoints: [
    { name: "spades", value: 42, color: "red", icon: <Spades /> },
    { name: "hearts", value: 41, color: "green", icon: <Hearts /> },
    { name: "clubs", value: 43, color: "red", icon: <Clubs /> },
    { name: "diamonds", value: 46, color: "red", icon: <Diamonds /> },
  ],
};
