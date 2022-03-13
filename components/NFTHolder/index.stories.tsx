import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MetaMaskProvider } from "metamask-react";
import NFTHolder from ".";

export default {
  title: "NFTHolder",
  component: NFTHolder,
} as ComponentMeta<typeof NFTHolder>;

const Template: ComponentStory<typeof NFTHolder> = (args) => (
  <MetaMaskProvider>
    <NFTHolder {...args} />
  </MetaMaskProvider>
);

export const Primary = Template.bind({});
Primary.args = {};
