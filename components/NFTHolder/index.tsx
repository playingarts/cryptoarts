import { useMetaMask } from "metamask-react";
import { FC, HTMLAttributes } from "react";
import Arrowed from "../Arrowed";
import Button, { Props as ButtonProps } from "../Button";
import Bag from "../Icons/Bag";
import Link from "../Link";
import MetamaskButton from "../MetamaskButton";
import StatBlock from "../StatBlock";
import Text from "../Text";

interface Props extends HTMLAttributes<HTMLElement> {
  ButtonProps: ButtonProps;
}

const NFTHolder: FC<Props> = ({ ButtonProps, ...props }) => {
  const { status } = useMetaMask();

  if (status !== "connected") {
    return (
      <StatBlock
        css={(theme) => ({
          backgroundColor: theme.colors.dark_gray,
          color: theme.colors.text_title_light,
        })}
        buttons={
          <MetamaskButton notConnected="Connect" unavailable="Install" />
        }
        {...props}
      >
        <Text component="h4" css={{ margin: 0 }}>
          NFT holder?
        </Text>

        <Text variant="body2">
          Connect your MetaMask wallet and see if you’re eligible for a bonus!
        </Text>

        <Text
          component={Link}
          variant="label"
          css={{
            opacity: 0.5,
          }}
          href="/"
        >
          <Arrowed>How It Works</Arrowed>
        </Text>
      </StatBlock>
    );
  }

  return (
    <StatBlock
      css={(theme) => ({
        backgroundColor: theme.colors.dark_gray,
        color: theme.colors.text_title_light,
      })}
      buttons={
        <Button {...ButtonProps} Icon={Bag}>
          Add all 3
        </Button>
      }
      {...props}
    >
      <Text component="h4" css={{ margin: 0 }}>
        GM chad!
      </Text>

      <Text variant="body2">
        You’re eligible for 3 free Crypto Edition decks! Use following code on
        checkout: <b>кодкадкоткод</b>.
      </Text>

      <Text
        component={Link}
        variant="label"
        css={{
          opacity: 0.5,
        }}
        href="/"
      >
        <Arrowed>Details</Arrowed>
      </Text>
    </StatBlock>
  );
};

export default NFTHolder;
