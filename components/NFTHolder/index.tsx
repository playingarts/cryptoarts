import { useMetaMask } from "metamask-react";
import { FC, HTMLAttributes, useEffect } from "react";
import { useBag } from "../../hooks/bag";
import { useLoadDeal } from "../../hooks/deal";
import Arrowed from "../Arrowed";
import Button from "../Button";
import Bag from "../Icons/Bag";
import Opensea from "../Icons/Opensea";
import Link from "../Link";
import Loader from "../Loader";
import MetamaskButton from "../MetamaskButton";
import StatBlock from "../StatBlock";
import Text from "../Text";

interface Props extends HTMLAttributes<HTMLElement> {
  productId: string;
  deck: GQL.Deck;
}

const NFTHolder: FC<Props> = ({ deck, productId, ...props }) => {
  const { status, account } = useMetaMask();
  const { loadDeal, deal, loading } = useLoadDeal();
  const { addItem } = useBag();

  useEffect(() => {
    if (!account) {
      return;
    }

    loadDeal({ variables: { hash: account, deckId: deck._id } });
  }, [account, loadDeal, deck._id]);

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
          href={{
            query: {
              scrollIntoView: "[data-id='block-faq']",
              scrollIntoViewBehavior: "smooth",
            },
          }}
          shallow={true}
          scroll={false}
        >
          <Arrowed>How It Works</Arrowed>
        </Text>
      </StatBlock>
    );
  }

  if (loading) {
    return (
      <Loader
        {...props}
        css={{
          textAlign: "center",
          alignSelf: "center",
        }}
      />
    );
  }

  if (!deal) {
    return (
      <StatBlock
        css={(theme) => ({
          backgroundColor: theme.colors.dark_gray,
          color: theme.colors.text_title_light,
        })}
        action={
          deck.openseaCollection ? (
            <Button
              component={Link}
              href={`https://opensea.io/collection/${deck.openseaCollection}`}
              target="_blank"
              Icon={Opensea}
              css={(theme) => ({
                background: theme.colors.gradient,
                marginRight: theme.spacing(2),
              })}
            >
              Buy NFT
            </Button>
          ) : undefined
        }
        {...props}
      >
        <Text component="h4" css={{ margin: 0 }}>
          GM!
        </Text>

        <Text variant="body2">
          You’re not holding any PACE NFT cards yet. Get one and check here
          again!
        </Text>
      </StatBlock>
    );
  }

  if (deal._id === "discountCode") {
    return (
      <StatBlock
        css={(theme) => ({
          backgroundColor: theme.colors.crypto,
          color: theme.colors.text_title_light,
        })}
        {...props}
      >
        <Text component="h4" css={{ margin: 0 }}>
          GM!
        </Text>

        <Text variant="body2">
          You hold {deal.decks} PACE NFT card! Use following code on checkout to
          get 50% on all items in your bag: “<b>{deal.code}</b>”.
        </Text>

        <Text
          component={Link}
          variant="label"
          css={{
            opacity: 0.5,
          }}
          href={{
            query: {
              scrollIntoView: "[data-id='block-faq']",
              scrollIntoViewBehavior: "smooth",
            },
          }}
          shallow={true}
          scroll={false}
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
        href={{
          query: {
            scrollIntoView: "[data-id='block-faq']",
            scrollIntoViewBehavior: "smooth",
          },
        }}
        shallow={true}
        scroll={false}
      >
        <Arrowed>Details</Arrowed>
      </Text>
    </StatBlock>
  );
};

export default NFTHolder;
