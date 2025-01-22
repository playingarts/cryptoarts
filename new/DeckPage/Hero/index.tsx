import { FC, HTMLAttributes, useState } from "react";
import Grid from "../../../components/Grid";
import Text from "../../Text";
import { useDeck } from "../../../hooks/deck";
import ArrowButton from "../../Buttons/Templates/ArrowButton";
import ButtonTemplate from "../../Buttons/Templates/ButtonTemplate";
import Plus from "../../Icons/Plus";
import HeroCards from "./HeroCards";

const Hero: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { deck, loading } = useDeck();

  return (
    <Grid
      css={(theme) => [
        {
          paddingTop: 235,
          paddingBottom: 60,
          background: theme.colors.soft_gray,
        },
      ]}
    >
      <div css={[{ gridColumn: "span 6" }]}>
        <Text typography="newh0" {...{ loading }}>
          {deck && deck.title}
        </Text>
        <Text {...{ loading }} css={[{ marginTop: 30 }]}>
          {deck && deck.info}
        </Text>
        <div css={[{ marginTop: 30, display: "flex", gap: 15 }]}>
          <ArrowButton variant="accent">Shop the collection</ArrowButton>
          <ButtonTemplate
            css={(theme) => [
              {
                // color: "white",
                color: theme.colors.accent,
                border: `${theme.colors.accent} solid 1px`,
                paddingRight: 15,
                marginRight: 15,
                "&:hover": {
                  color: "white",
                  background: theme.colors.accent,
                },
              },
            ]}
          >
            <Plus /> Story
          </ButtonTemplate>
        </div>
      </div>
      <HeroCards />
    </Grid>
  );
};

export default Hero;
