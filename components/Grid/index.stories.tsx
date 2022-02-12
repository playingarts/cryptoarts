import { ComponentStory, ComponentMeta } from "@storybook/react";
import Grid from ".";

export default {
  title: "Grid",
  component: Grid,
} as ComponentMeta<typeof Grid>;

const Template: ComponentStory<typeof Grid> = (args) => (
  <Grid {...args}>
    <div css={{ gridColumn: "span 6", background: "lightgray" }}>1/2</div>
    <div css={{ gridColumn: "span 6", background: "lightgray" }}>1/2</div>

    <div css={{ gridColumn: "span 4", background: "lightgray" }}>1/3</div>
    <div css={{ gridColumn: "span 4", background: "lightgray" }}>1/3</div>
    <div css={{ gridColumn: "span 4", background: "lightgray" }}>1/3</div>

    <div css={{ gridColumn: "span 3", background: "lightgray" }}>1/4</div>
    <div css={{ gridColumn: "span 3", background: "lightgray" }}>1/4</div>
    <div css={{ gridColumn: "span 3", background: "lightgray" }}>1/4</div>
    <div css={{ gridColumn: "span 3", background: "lightgray" }}>1/4</div>

    <div css={{ gridColumn: "span 9", background: "lightgray" }}>3/4</div>
    <div css={{ gridColumn: "10 / span 3", background: "lightgray" }}>1/4</div>
  </Grid>
);

export const Primary = Template.bind({});
Primary.args = {};
