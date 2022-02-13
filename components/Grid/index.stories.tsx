import { ComponentStory, ComponentMeta } from "@storybook/react";
import Grid from ".";

export default {
  title: "Grid",
  component: Grid,
} as ComponentMeta<typeof Grid>;

const Template: ComponentStory<typeof Grid> = (args) => (
  <Grid {...args} css={(theme) => ({ rowGap: theme.spacing(3) })}>
    <div css={{ gridColumn: "span 6", background: "lightgray" }}>6 columns</div>
    <div css={{ gridColumn: "span 6", background: "lightgray" }}>6 columns</div>

    <div css={{ gridColumn: "span 4", background: "lightgray" }}>4 columns</div>
    <div css={{ gridColumn: "span 4", background: "lightgray" }}>4 columns</div>
    <div css={{ gridColumn: "span 4", background: "lightgray" }}>4 columns</div>

    <div css={{ gridColumn: "span 3", background: "lightgray" }}>3 columns</div>
    <div css={{ gridColumn: "span 3", background: "lightgray" }}>3 columns</div>
    <div css={{ gridColumn: "span 3", background: "lightgray" }}>3 columns</div>
    <div css={{ gridColumn: "span 3", background: "lightgray" }}>3 columns</div>

    <div css={{ gridColumn: "span 9", background: "lightgray" }}>9 columns</div>
    <div css={{ gridColumn: "10 / span 3", background: "lightgray" }}>
      3 columns
    </div>

    <div css={{ gridColumn: "2 / span 10", background: "lightgray" }}>
      10 columns
    </div>

    <Grid css={{ display: "grid", gridColumn: "2 / span 10" }}>
      <div css={{ gridColumn: "span 2", background: "gray" }}>2 columns</div>
      <div css={{ gridColumn: "span 8", background: "gray" }}>8 columns</div>
    </Grid>
  </Grid>
);

export const Primary = Template.bind({});
Primary.args = {};
