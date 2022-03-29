import { useMetaMask } from "metamask-react";
import { FC, HTMLAttributes, useEffect } from "react";
import { useBag } from "../../hooks/bag";
import { useLoadDeal } from "../../hooks/deal";
import Arrowed from "../Arrowed";
import Button from "../Button";
import Bag from "../Icons/Bag";
import Link from "../Link";
import MetamaskButton from "../MetamaskButton";
import StatBlock from "../StatBlock";
import Text from "../Text";

interface Props extends HTMLAttributes<HTMLElement> {
  deckId: string;
  productId: string;
}

const NFTHolder: FC<Props> = ({ productId, deckId, ...props }) => {
  const { status, account } = useMetaMask();
  const { loadDeal, deal, loading } = useLoadDeal();
  const { addItem } = useBag();

  useEffect(() => {
    if (!account) {
      return;
    }

    loadDeal({ variables: { hash: account, deck: deckId } });
  }, [account, loadDeal, deckId]);

  if (status !== "connected") {
    return (
      <StatBlock
        css={(theme) => ({
          backgroundColor: theme.colors.dark_gray,
          color: theme.colors.text_title_light,
        })}
        action={
          <MetamaskButton
            textColor="white"
            backgroundColor="orange"
            notConnected="Connect"
            unavailable="Install"
          />
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

  if (loading || deal === undefined) {
    return null;
  }

  if (!deal) {
    return null;
  }

  return (
    <StatBlock
      css={(theme) => ({
        backgroundColor: theme.colors.dark_gray,
        color: theme.colors.text_title_light,
      })}
      action={
        <Button onClick={() => addItem(productId, deal.decks)} Icon={Bag}>
          Add all {deal.decks}
        </Button>
      }
      {...props}
    >
      <Text component="h4" css={{ margin: 0 }}>
        GM chad!
      </Text>

      <Text variant="body2">
        You’re eligible for {deal.decks} free Crypto Edition decks! Use
        following code on checkout: <b>{deal.code}</b>.
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
