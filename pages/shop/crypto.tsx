import { NextPage } from "next";
import { Fragment, useEffect, useState } from "react";
import ComposedGlobalLayout from "../../components/_composed/GlobalLayout";
import { withApollo } from "../../source/apollo";
import { useDeck } from "../../hooks/deck";
import AddToBagButton from "../../components/AddToBagButton";
import SelectButton from "../../components/SelectButton";
import BagButton from "../../components/BagButton";
import ComposedMain from "../../components/_composed/ComposedMain";
import Button from "../../components/Button";
import { theme } from "../_app";
import Layout from "../../components/Layout";
import AugmentedReality from "../../components/AugmentedReality";
import DeckBlock from "../../components/DeckBlock";
import Grid from "../../components/Grid";
import ComposedFaq from "../../components/_composed/Faq";

const saleStartDate = new Date(
  new Date(process.env.NEXT_PUBLIC_COUNTDOWN || "").toLocaleString("en", {
    timeZone: "Europe/Madrid",
  })
);

const saleEndDate = new Date(
  saleStartDate.getTime() +
    1000 * 60 * 60 * Number(process.env.NEXT_PUBLIC_SALEHOURS || 48)
);

const getCurrentDate = () =>
  new Date(
    new Date().toLocaleString("en", {
      timeZone: "Europe/Madrid",
    })
  );

const calculateTimeLeft = () => {
  const currentDate = getCurrentDate();

  const difference =
    +(currentDate <= saleStartDate ? saleStartDate : saleEndDate) -
    +currentDate;

  const timeLeft = {
    hours: Math.floor(difference / (1000 * 60 * 60)),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
  return timeLeft;
};

const Crypto: NextPage = () => {
  const { deck } = useDeck({ variables: { slug: "crypto" } });

  const [quantity, setQuantity] = useState(1);

  const options = Array.from(
    {
      length: !quantity || quantity < 13 ? 13 : quantity + 1,
    },
    (_, i) => i
  ).filter((i) => !!i);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 200);

    return () => clearTimeout(timer);
  });

  if (!deck) {
    return null;
  }

  return (
    <Fragment>
      <ComposedGlobalLayout
        deckId="crypto"
        palette="light"
        customShopButton={<BagButton color="black" />}
      >
        <ComposedMain
          title={deck && deck.short}
          subtitle="Latest release in Playing Arts collection showcasing the masterpieces of 55 renowned digital artists. Now in stock as a physical edition, exclusively for Playing Arts supporters and for a limited time only. Don't miss out!"
          labels={["physical"]}
          slug={deck && deck.slug}
          css={(theme) => [
            {
              background: theme.colors.decks["crypto"].background,
              color: theme.colors.decks["crypto"].textColor,
              overflow: "initial",
              [theme.mq.sm]: {
                backgroundImage:
                  "url(https://s3.amazonaws.com/img.playingarts.com/www/shop/product_crypto_bg.jpg)",
                backgroundSize: "cover",
              },
            },
          ]}
        >
          <Fragment>
            {deck && deck.product && (
              <Fragment>
                <div
                  css={(theme) => [
                    {
                      display: "flex",
                      flexWrap: "wrap",
                      [theme.maxMQ.sm]: {
                        gap: theme.spacing(1),
                      },
                    },
                  ]}
                >
                  {process.env.NEXT_PUBLIC_SALEENDED !== "true" &&
                    getCurrentDate() >= saleStartDate &&
                    getCurrentDate() <= saleEndDate && (
                      <Fragment>
                        <SelectButton
                          keepOrder={true}
                          value={quantity}
                          setter={setQuantity}
                          states={options.map((option) => ({
                            children: option,
                          }))}
                          listCSS={{
                            color: theme.colors.text_title_dark,
                            background:
                              theme.colors.decks.crypto.nav.button.background,
                          }}
                          css={(theme) => [
                            {
                              display: "inline-block",
                              // maxHeight: "100%",
                              // maxHeight: "calc(var(--buttonHeight)*6)",
                              // overflowY: "scroll",
                              overflow: "visible",
                              width: theme.spacing(8),
                              marginRight: 20,
                              [theme.maxMQ.sm]: {
                                // maxHeight: "calc(var(--buttonHeight)*2.5)",
                                // width: theme.spacing(10),
                                marginRight: 0,
                              },
                            },
                          ]}
                        />
                        <AddToBagButton
                          productId={deck.product._id}
                          amount={quantity}
                          css={(theme) => [
                            {
                              color: theme.colors.text_title_dark,
                              background:
                                theme.colors.decks.crypto.nav.button.background,
                            },
                          ]}
                        ></AddToBagButton>
                      </Fragment>
                    )}
                  <Button
                    css={(theme) => [
                      {
                        background: "transparent",
                        color: theme.colors.decks.crypto.nav.button.background,
                        [theme.maxMQ.sm]: {
                          paddingLeft: "0",
                        },
                        "&:hover": {
                          cursor: "initial",
                        },
                      },
                      (process.env.NEXT_PUBLIC_SALEENDED === "true" ||
                        getCurrentDate() > saleEndDate ||
                        getCurrentDate() < saleStartDate) && {
                        paddingLeft: 0,
                      },
                    ]}
                  >
                    {getCurrentDate() <= saleEndDate &&
                    process.env.NEXT_PUBLIC_SALEENDED !== "true"
                      ? `the sale ${
                          getCurrentDate() <= saleStartDate ? "starts" : "ends"
                        } in ${
                          (timeLeft.hours < 10 ? "0" : "") + timeLeft.hours
                        }:${
                          (timeLeft.minutes < 10 ? "0" : "") + timeLeft.minutes
                        }:${
                          (timeLeft.seconds < 10 ? "0" : "") + timeLeft.seconds
                        }`
                      : process.env.NEXT_PUBLIC_SALEENDMESSAGE || "ended"}
                  </Button>
                </div>
              </Fragment>
            )}
          </Fragment>
        </ComposedMain>
        <div
          css={(theme) => [
            {
              background: theme.colors.page_bg_dark,
              [theme.maxMQ.sm]: {
                gap: theme.spacing(1),
                paddingTop: theme.spacing(3),
                paddingBottom: theme.spacing(5),
              },
            },
          ]}
        >
          <Layout
            css={(theme) => [
              {
                color: theme.colors.text_title_light,
                background: theme.colors.page_bg_dark,
                [theme.mq.sm]: {
                  paddingTop: theme.spacing(12),
                  paddingBottom: theme.spacing(3),
                },
              },
            ]}
            // ref={deckRef}
            // scrollIntoView={section === Sections.deck}
            palette={"dark"}
          >
            <DeckBlock
              noButtonIcon={true}
              lightButton={true}
              title="Deck Details"
              palette={"dark"}
              deck={deck}
              buttonText="shipping info"
              buttonHref={{
                // pathname: "/shop",
                query: {
                  scrollIntoView: `[data-id='faq']`,
                  scrollIntoViewBehavior: "smooth",
                },
              }}
            />
          </Layout>

          <Layout
            css={(theme) => [
              {
                [theme.mq.sm]: {
                  paddingBottom: theme.spacing(6),
                  paddingTop: theme.spacing(0),
                  background: theme.colors.page_bg_dark,
                },
              },
            ]}
            palette={"dark"}
          >
            <AugmentedReality palette={"dark"} />
          </Layout>
        </div>
        <Layout
          data-id="faq"
          css={(theme) => ({
            background: theme.colors.dark_gray,
            paddingTop: theme.spacing(12),
            paddingBottom: theme.spacing(11),
            [theme.mq.sm]: {
              zIndex: 1,
              borderRadius: "0px 0px 50px 50px",
            },
            [theme.maxMQ.sm]: {
              paddingTop: theme.spacing(9),
              paddingBottom: theme.spacing(5),
            },
          })}
        >
          <Grid short={true}>
            <ComposedFaq
              css={[
                {
                  gridColumn: "1 / -1",
                },
              ]}
              title="shipping info"
              palette="dark"
            />
          </Grid>
        </Layout>
      </ComposedGlobalLayout>
    </Fragment>
  );
};

export default withApollo(Crypto);
