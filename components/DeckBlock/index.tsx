import { Theme } from "@emotion/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { breakpoints } from "../../source/enums";
import Button from "../Button";
import Bag from "../Icons/Bag";
import Link from "../Link";
import { useSize } from "../SizeProvider";
import BlockWithProperties from "../_composed/BlockWithProperties";

export interface Props {
  deck: GQL.Deck;
  palette: "light" | "dark";
}

const common = (theme: Theme, palette: Props["palette"]) => ({
  borderRadius: "20px",
  [theme.maxMQ.sm]: {
    borderRadius: "10px",
    flexBasis: "100%",
    flexGrow: "1",
    aspectRatio: "1",
  },
  [theme.mq.sm]: {
    width: theme.spanColumns(3),
  },
  [theme.mq.md]: {
    width: theme.spanColumns(4),
  },
  backgroundRepeat: "no-repeat",
  backgroundColor:
    palette === "dark" ? theme.colors.dark_gray : theme.colors.page_bg_light,
  backgroundPosition: "center",
});

const DeckBlock: ForwardRefRenderFunction<HTMLElement, Props> = ({
  deck,
  palette,
}) => {
  const buyButton = (
    <Button
      color="black"
      component={Link}
      href={{
        pathname: "/shop",
        query: {
          scrollIntoView: `[data-id='${deck.slug}']`,
          scrollIntoViewBehavior: "smooth",
        },
      }}
      Icon={Bag}
      css={(theme) => [
        {
          width: "100%",
          justifyContent: "center",
          [theme.maxMQ.sm]: [
            {
              gridColumn: "1 / -1",
              marginTop: theme.spacing(1),
              marginBottom: theme.spacing(2.5),
              marginLeft: theme.spacing(2),
              marginRight: theme.spacing(2),
              width: "auto",
            },
          ],
          [theme.mq.sm]: {
            gridColumn: "span 2/ 8",
          },
          [theme.mq.md]: {
            gridColumn: "span 2/ 9",
          },
        },
        palette === "dark" && {
          background: theme.colors.page_bg_light,
          color: theme.colors.page_bg_dark,
        },
      ]}
    >
      {/* todo: make dynamic text */}
      {/* {deck.openseaCollection
        ? "Claim"
        : deck.product.status === "soldout"
        ? "Sold out"
        : "Buy now"} */}
      Buy now
    </Button>
  );

  const { width } = useSize();

  return (
    <BlockWithProperties
      title="Physical Deck"
      properties={Object.keys(deck.properties).map((key) => ({
        key,
        value: deck.properties[key],
      }))}
      palette={palette}
      action={buyButton}
    >
      {width < breakpoints.sm ? buyButton : null}
      <div
        css={(theme) => [
          {
            display: "flex",
            flexWrap: "wrap",
            gap: theme.spacing(1),
            gridColumn: "1/-1",
            paddingBottom: theme.spacing(3),

            [theme.mq.sm]: {
              flexDirection: "column",
              height: theme.spacing(67.2),
              gap: theme.spacing(3),
              paddingBottom: "0",
            },
            [theme.mq.md]: {
              height: theme.spacing(90.8),
              gap: theme.spacing(3),
              paddingBottom: "0",
            },
          },
        ]}
      >
        <img
          css={(theme) => [
            {
              ...common(theme, palette),
              objectFit: "cover",
              aspectRatio: "1",
            },
          ]}
          width={0}
          src={deck.image}
          loading="lazy"
        />
        <img
          loading="lazy"
          width={0}
          css={(theme) => [
            {
              aspectRatio: "390 / 488",
              ...common(theme, palette),
              objectFit: "cover",
            },
          ]}
          src={`https://s3.amazonaws.com/img.playingarts.com/www/decks/gallery/${deck.slug}-01.jpg`}
        />
        <img
          loading="lazy"
          width={0}
          css={(theme) => [
            {
              aspectRatio: "390 / 488",
              ...common(theme, palette),
              objectFit: "cover",
            },
          ]}
          src={`https://s3.amazonaws.com/img.playingarts.com/www/decks/gallery/${deck.slug}-02.jpg`}
        />
        <img
          loading="lazy"
          width={0}
          src={`https://s3.amazonaws.com/img.playingarts.com/www/decks/gallery/${deck.slug}-03.jpg`}
          css={(theme) => [
            {
              aspectRatio: "1",
              ...common(theme, palette),
              objectFit: "cover",
            },
          ]}
        />
        <img
          loading="lazy"
          width={0}
          src={`https://s3.amazonaws.com/img.playingarts.com/www/decks/gallery/${deck.slug}-04.jpg`}
          css={(theme) => [
            {
              aspectRatio: "390 / 438",
              ...common(theme, palette),
              objectFit: "cover",
            },
          ]}
        />
        <img
          loading="lazy"
          width={0}
          src={`https://s3.amazonaws.com/img.playingarts.com/www/decks/gallery/${deck.slug}-05.jpg`}
          alt=""
          css={(theme) => [
            {
              aspectRatio: "390 / 440",
              objectFit: "cover",
              ...common(theme, palette),
            },
          ]}
        />
      </div>
    </BlockWithProperties>
  );
};

export default forwardRef(DeckBlock);
