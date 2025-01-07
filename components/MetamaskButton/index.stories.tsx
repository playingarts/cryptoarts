import { ComponentStory, ComponentMeta } from "@storybook/react";
import MetamaskButton from ".";
import { MetaMaskProvider } from "metamask-react";

export default {
  title: "old/MetamaskButton",
  component: MetamaskButton,
} as ComponentMeta<typeof MetamaskButton>;

const Template: ComponentStory<typeof MetamaskButton> = (args) => (
  <MetaMaskProvider>
    <MetamaskButton {...args} />
  </MetaMaskProvider>
);

export const Primary = Template.bind({});
Primary.parameters = {};
