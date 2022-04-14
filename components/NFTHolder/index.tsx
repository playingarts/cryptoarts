import { useMetaMask } from "metamask-react";
import { FC, HTMLAttributes, useEffect, useState } from "react";
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
import store from "store";

interface Props extends HTMLAttributes<HTMLElement> {
  deck: GQL.Deck;
  productId: string;
}

const NFTHolder: FC<Props> = ({ deck, productId, ...props }) => {
  const { status, ethereum, account } = useMetaMask();
  const { loadDeal, deal, loading, error } = useLoadDeal();

  const [
    { account: signedAccount, expiry, signature, signing },
    setSignature,
  ] = useState(
    (store.get("signature") as {
      account?: string;
      expiry?: number;
      signature?: string;
      signing?: boolean;
    }) || {}
  );

  useEffect(() => {
    if (
      !account ||
      !signature ||
      !expiry ||
      expiry < Date.now() ||
      signedAccount !== account
    ) {
      setSignature({});
      store.remove("signature");

      return;
    }

    store.set("signature", { expiry, signature, account });

    loadDeal({
      variables: {
        signature,
        hash: account,
        deckId: deck._id,
      },
    });
  }, [account, signature, loadDeal, deck._id, expiry, signedAccount]);

  useEffect(() => {
    if (error) {
      setSignature({});
      store.remove("signature");
    }
  }, [error]);

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

  if (!account || status !== "connected") {
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

  if (account !== signedAccount || deal === undefined) {
    const requestSignature = () => {
      setSignature((prev) => ({ ...prev, signing: true }));

      ethereum
        .request({
          method: "personal_sign",
          params: [process.env.NEXT_PUBLIC_SIGNATURE_MESSAGE, account],
        })
        .then((signature: string) =>
          setSignature({
            account,
            expiry: Date.now() + 1000 * 60 * 60,
            signature,
            signing: false,
          })
        )
        .catch(() => setSignature((prev) => ({ ...prev, signing: false })));
    };

    return (
      <StatBlock
        css={(theme) => ({
          backgroundColor: theme.colors.dark_gray,
          color: theme.colors.text_title_light,
        })}
        action={
          <Button loading={signing} onClick={requestSignature}>
            {signing ? "signing" : "sign"}
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

  if (deal === null) {
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
        <AddToBagButton productId={productId} amount={deal.decks} Icon={Bag}>
          Add all {deal.decks}
        </AddToBagButton>
      }
      {...props}
    >
      <Text component="h4" css={{ margin: 0 }}>
        GM!
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
