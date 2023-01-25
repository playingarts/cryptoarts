import { useMetaMask } from "metamask-react";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import { useSignature } from "../../contexts/SignatureContext";
import { useLoadDeal } from "../../hooks/deal";
import { useProducts } from "../../hooks/product";
import { breakpoints } from "../../source/enums";
import AddToBagButton from "../AddToBagButton";
import Arrowed from "../Arrowed";
import Button from "../Button";
import Bag from "../Icons/Bag";
import Opensea from "../Icons/Opensea";
import Link from "../Link";
import Loader from "../Loader";
import MetamaskButton from "../MetamaskButton";
import { useSize } from "../SizeProvider";
import StatBlock from "../StatBlock";
import Text from "../Text";

const latestReleaseSlug = process.env.NEXT_PUBLIC_LATEST_RELEASE;

interface Props extends HTMLAttributes<HTMLElement> {
  gradient?: boolean;
  // noDesc?: boolean;
  metamaskText?: string;
}
const NFTHolder: FC<Props> = ({
  metamaskText = "Connect MetaMask",
  // noDesc,
  gradient,
  ...props
}) => {
  const { products } = useProducts();

  const product =
    products &&
    products.find(
      (product) => product.deck && product.deck.slug === latestReleaseSlug
    );
  // const { deck, _id: productId } = product;

  const { status, account } = useMetaMask();
  const { getSig, removeSig, askSig } = useSignature();
  const { loadDeal, deal, loading, error } = useLoadDeal();

  const [currentDeal, setCurrentDeal] = useState<typeof deal>();

  useEffect(() => {
    setCurrentDeal(undefined);
  }, [account]);

  useEffect(() => {
    setCurrentDeal(deal);
  }, [deal]);

  useEffect(() => {
    const sig = getSig();
    if (!sig || !sig.signature || !product || !product.deck) {
      return;
    }

    loadDeal({
      variables: process.env.STORYBOOK
        ? {
            signature: "1",
            hash: "1",
            deckId: "1",
          }
        : {
            signature: sig.signature,
            hash: account,
            deckId: product.deck._id,
          },
    });
  }, [getSig, account, product, loadDeal]);

  useEffect(() => {
    if (error) {
      removeSig();
    }
  }, [error, removeSig]);

  const { width } = useSize();

  if (!products) {
    return null;
  }

  if (!product || !product.deck) {
    return null;
  }

  if (error) {
    return (
      <StatBlock
        css={(theme) => ({
          backgroundColor: theme.colors.dark_gray,
          color: theme.colors.text_title_light,
          [theme.maxMQ.sm]: {
            paddingTop: theme.spacing(4),
          },
        })}
        {...props}
      >
        <Text
          component="h5"
          css={(theme) => [
            {
              margin: 0,
              [theme.maxMQ.sm]: {
                textAlign: "center",
              },
            },
          ]}
        >
          Error
        </Text>

        <Text
          variant="body2"
          css={(theme) => [
            {
              [theme.maxMQ.sm]: {
                textAlign: "center",
              },
            },
          ]}
        >
          Something went wrong. Try again later.
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
          [theme.maxMQ.sm]: {
            paddingTop: theme.spacing(4),
          },
        })}
        action={
          width < breakpoints.sm ? (
            <MetamaskButton
              textColor="white"
              backgroundColor="orange"
              notConnected="Connect MetaMask"
              unavailable="Install"
              noIcon={width < breakpoints.sm}
              css={(theme) => [
                {
                  background: theme.colors.page_bg_light,
                  color: theme.colors.text_title_dark,

                  [theme.maxMQ.sm]: { width: "100%", justifyContent: "center" },
                  [theme.mq.sm]: [gradient && {}],
                },
              ]}
            >
              <span>
                {metamaskText}
              </span>
            </MetamaskButton>
          ) : undefined
        }
        {...props}
      >
        <Text
          component="h5"
          css={(theme) => [
            {
              margin: 0,
              [theme.maxMQ.sm]: {
                textAlign: "center",
                textTransform: "uppercase",
              },
            },
          ]}
        >
          NFT holder?
        </Text>

        {/* {!noDesc && (  */}
          <Text
            variant="body2"
            css={(theme) => [
              {
                [theme.maxMQ.sm]: {
                  textAlign: "center",
                  margin: 0,
                  marginTop: theme.spacing(1),
                },
              },
            ]}
          >
            Connect your MetaMask wallet and see if you’re eligible for a deck!
          </Text>
        {/* )} */}

        {width >= breakpoints.sm && (
          <Text
            component={Link}
            variant="label"
            css={[{ opacity: 0.5 }]}
            href={{
              query: {
                scrollIntoView: "[data-id='faq']",
                scrollIntoViewBehavior: "smooth",
                scrollIntoViewPosition: "start",
              },
            }}
            shallow={true}
            scroll={false}
          >
            <Arrowed>How It Works</Arrowed>
          </Text>
        )}
      </StatBlock>
    );
  }

  //todo deal is undefined
  if (currentDeal === undefined) {
    const sig = getSig();
    if (sig) {
      return (
        <StatBlock
          css={(theme) => ({
            backgroundColor: theme.colors.dark_gray,
            color: theme.colors.text_title_light,
            [theme.maxMQ.sm]: {
              paddingTop: theme.spacing(4),
            },
          })}
          action={
            <Button
              loading={sig.signing || loading}
              onClick={askSig}
              css={(theme) => [
                {
                  [theme.maxMQ.sm]: { width: "100%", justifyContent: "center" },
                },
              ]}
            >
              {sig.signing ? "signing" : "sign"}
            </Button>
          }
          {...props}
        >
          <Text
            component="h5"
            css={(theme) => [
              {
                margin: 0,
                textTransform: "uppercase",
                [theme.maxMQ.sm]: {
                  textAlign: "center",
                },
              },
            ]}
          >
            NFT holder?
          </Text>

          <Text
            variant="body2"
            css={(theme) => [
              {
                [theme.maxMQ.sm]: {
                  textAlign: "center",
                },
              },
            ]}
          >
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
          [theme.maxMQ.sm]: {
            paddingTop: theme.spacing(4),
          },
        })}
        action={
          product.deck.openseaCollection ? (
            <Button
              component={Link}
              href={`https://opensea.io/collection/${product.deck.openseaCollection.name}`}
              target="_blank"
              Icon={Opensea}
              css={(theme) => ({
                background: theme.colors.eth,
                color: theme.colors.page_bg_dark,
                animation: "gradient 5s ease infinite",
                backgroundSize: "400% 100%",
                marginRight: theme.spacing(2),
                [theme.maxMQ.sm]: {
                  width: "100%",
                  justifyContent: "center",
                },
              })}
            >
              Buy NFT
            </Button>
          ) : undefined
        }
        {...props}
      >
        <Text
          component="h5"
          css={(theme) => [
            {
              margin: 0,
              [theme.maxMQ.sm]: {
                textAlign: "center",

                textTransform: "uppercase",
              },
            },
          ]}
        >
          GM Fren
        </Text>

        <Text
          variant="body2"
          css={(theme) => [
            {
              [theme.maxMQ.sm]: {
                margin: 0,
                textAlign: "center",
                marginTop: theme.spacing(2),
              },
            },
          ]}
        >
          You’re not holding any Playing Arts Crypto Edition NFT cards.
        </Text>
        {width >= breakpoints.sm && (
          <Text
            component={Link}
            variant="label"
            css={[{ opacity: 0.5 }]}
            href={{
              query: {
                scrollIntoView: "[data-id='faq']",
                scrollIntoViewBehavior: "smooth",
              },
            }}
            shallow={true}
            scroll={false}
          >
            <Arrowed>How It Works</Arrowed>
          </Text>
        )}
      </StatBlock>
    );
  }

  if (currentDeal._id === "discountCode") {
    return (
      <StatBlock
        css={(theme) => ({
          backgroundColor: theme.colors.crypto,
          color: theme.colors.text_title_light,
          [theme.maxMQ.sm]: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
          },
        })}
        {...props}
      >
        <Text
          css={(theme) => [
            {
              margin: 0,
              [theme.maxMQ.sm]: {
                textAlign: "center",
                textTransform: "uppercase",
              },
            },
          ]}
          component="h5"
        >
          GM Fren!
        </Text>

        <Text
          variant="body2"
          css={(theme) => [
            {
              [theme.maxMQ.sm]: { textAlign: "center" },
            },
          ]}
        >
          You hold {currentDeal.decks} PACE NFT card(s)! Use following code on
          checkout to get 50% on all items in your bag: “
          <b>{currentDeal.code}</b>”.
        </Text>

        <Text
          component={Link}
          variant="label"
          css={(theme) => [
            {
              opacity: 0.5,
              [theme.maxMQ.sm]: { display: "block", textAlign: "center", },
            },
          ]}
          href={{
            query: {
              scrollIntoView: "[data-id='faq']",
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
        [theme.maxMQ.sm]: {
          paddingTop: theme.spacing(4),
        },
      })}
      action={
        <AddToBagButton
          productId={product._id}
          amount={currentDeal.decks}
          Icon={Bag}
          css={(theme) => [
            {
              [theme.maxMQ.sm]: {
                width: "100%",
                justifyContent: "center",
              },
            },
          ]}
        >
          Add {width >= breakpoints.sm ? "all " : ""}
          {currentDeal.decks}
          {width < breakpoints.sm ? " to bag" : ""}
        </AddToBagButton>
      }
      {...props}
    >
      <Text
        component="h5"
        css={(theme) => [
          {
            margin: 0,
            [theme.maxMQ.sm]: {
              textAlign: "center",
              textTransform: "uppercase",
            },
          },
        ]}
      >
        GM Fren!
      </Text>

      <Text
        variant="body2"
        css={(theme) => [
          {
            [theme.maxMQ.sm]: {
              margin: 0,
              marginTop: theme.spacing(2),
              textAlign: "center",
            },
          },
        ]}
      >
        You’re eligible for {currentDeal.decks} free Crypto Edition decks! Use
        following code on checkout: <b>{currentDeal.code}</b>.
      </Text>

      {width >= breakpoints.sm && (
        <Text
          component={Link}
          variant="label"
          css={[
            {
              opacity: 0.5,
            },
          ]}
          href={{
            query: {
              scrollIntoView: "[data-id='faq']",
              scrollIntoViewBehavior: "smooth",
            },
          }}
          shallow={true}
          scroll={false}
        >
          <Arrowed>Details</Arrowed>
        </Text>
      )}
    </StatBlock>
  );
};

export default NFTHolder;
