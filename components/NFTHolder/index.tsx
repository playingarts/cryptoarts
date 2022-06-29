import { useMetaMask } from "metamask-react";
import {
  FC,
  HTMLAttributes,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useLoadDeal } from "../../hooks/deal";
import AddToBagButton from "../AddToBagButton";
import Arrowed from "../Arrowed";
import Button from "../Button";
import Bag from "../Icons/Bag";
import Opensea from "../Icons/Opensea";
import Link from "../Link";
import Loader from "../Loader";
import MetamaskButton from "../MetamaskButton";
import StatBlock from "../StatBlock";
import Text from "../Text";
import { useSignature } from "../SignatureContext";

interface Props extends HTMLAttributes<HTMLElement> {
  deck: GQL.Deck;
  productId: string;
}

const NFTHolder: FC<Props> = ({ deck, productId, ...props }) => {
  const { status, account } = useMetaMask();
  const { getSig, removeSig, askSig } = useSignature();
  const { loadDeal, deal, loading, error } = useLoadDeal();

  const [currentDeal, setCurrentDeal] = useState<typeof deal>();

  useLayoutEffect(() => {
    setCurrentDeal(undefined);
  }, [account]);

  useLayoutEffect(() => {
    setCurrentDeal(deal);
  }, [deal]);

  useLayoutEffect(() => {
    const sig = getSig();
    if (!sig || !sig.signature) {
      return;
    }

    loadDeal({
      variables: {
        signature: sig.signature,
        hash: account,
        deckId: deck._id,
      },
    });
  }, [getSig, account, deck._id, loadDeal]);

  useEffect(() => {
    if (error) {
      removeSig();
    }
  }, [error, removeSig]);

  if (error) {
    return (
      <StatBlock
        css={(theme) => ({
          backgroundColor: theme.colors.dark_gray,
          color: theme.colors.text_title_light,
        })}
        {...props}
      >
        <Text component="h4" css={{ margin: 0 }}>
          Error
        </Text>

        <Text variant="body2">
          Something went wrong.
          <br />
          Try again later.
        </Text>
      </StatBlock>
    );
  }

  if (!account || status !== "connected" || !getSig()) {
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

  if (currentDeal === undefined) {
    const sig = getSig();
    if (sig) {
      return (
        <StatBlock
          css={(theme) => ({
            backgroundColor: theme.colors.dark_gray,
            color: theme.colors.text_title_light,
          })}
          action={
            <Button loading={sig.signing || loading} onClick={askSig}>
              {sig.signing ? "signing" : "sign"}
            </Button>
          }
          {...props}
        >
          <Text component="h4" css={{ margin: 0 }}>
            NFT holder?
          </Text>

          <Text variant="body2">
            Please sign to verify that you’re the owner of this ETH address.
          </Text>
        </StatBlock>
      );
    }
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

  if (currentDeal === null || !currentDeal) {
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
              href={`https://opensea.io/collection/${deck.openseaCollection.name}`}
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

  if (currentDeal._id === "discountCode") {
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
          You hold {currentDeal.decks} PACE NFT card! Use following code on
          checkout to get 50% on all items in your bag: “
          <b>{currentDeal.code}</b>”.
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
        <AddToBagButton
          productId={productId}
          amount={currentDeal.decks}
          Icon={Bag}
        >
          Add all {currentDeal.decks}
        </AddToBagButton>
      }
      {...props}
    >
      <Text component="h4" css={{ margin: 0 }}>
        GM!
      </Text>

      <Text variant="body2">
        You’re eligible for {currentDeal.decks} free Crypto Edition decks! Use
        following code on checkout: <b>{currentDeal.code}</b>.
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
