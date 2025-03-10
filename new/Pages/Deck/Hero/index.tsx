import { FC, HTMLAttributes, useState } from "react";
import Grid from "../../../../components/Grid";
import Text from "../../../Text";
import { useDeck } from "../../../../hooks/deck";
import ArrowButton from "../../../Buttons/ArrowButton";
import ButtonTemplate from "../../../Buttons/Button";
import Plus from "../../../Icons/Plus";
import HeroCards from "./HeroCards";
import { useRouter } from "next/router";
import { usePalette } from "../DeckPaletteContext";

const Hero: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const {
    query: { deckId },
  } = useRouter();

  const { palette } = usePalette();

  const { deck, loading } = useDeck({ variables: { slug: deckId } });

  return (
    <Grid
      css={(theme) => [
        {
          paddingTop: 235,
          paddingBottom: 60,
          background:
            theme.colors[palette === "dark" ? "spaceBlack" : "soft_gray"],
        },
      ]}
    >
      <div css={[{ gridColumn: "span 6" }]}>
        <Text
          typography="newh0"
          css={[palette === "dark" && { color: "white" }]}
          {...{ loading }}
        >
          {deck && deck.title}
        </Text>
        <Text
          {...{ loading }}
          css={[
            { marginTop: 30 },
            palette === "dark" && { color: "white", opacity: 0.75 },
          ]}
        >
          {deck && deck.info}
        </Text>
        <div css={[{ marginTop: 30, display: "flex", gap: 15 }]}>
          <ArrowButton color="accent">Shop this deck</ArrowButton>
          <ButtonTemplate
            palette={palette}
            bordered={true}
            color={palette === "dark" ? "white" : "accent"}
            css={(theme) => [
              {
                paddingLeft: 10,
              },
            ]}
          >
            <Plus css={[{ marginRight: 0 }]} /> Story
          </ButtonTemplate>
        </div>
      </div>
      <HeroCards />
    </Grid>
  );
};

export default Hero;
