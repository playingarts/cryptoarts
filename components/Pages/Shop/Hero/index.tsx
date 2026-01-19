import { FC, HTMLAttributes, useEffect } from "react";
import Grid from "../../../Grid";
import Text from "../../../Text";
import ButtonTemplate from "../../../Buttons/Button";
import ArrowButton from "../../../Buttons/ArrowButton";
import Link from "../../../Link";

const Hero: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  useEffect(() => {}, []);

  return (
    <Grid
      css={(theme) => [
        {
          paddingTop: 235,
          paddingBottom: 60,
          background: theme.colors.soft_gray,
          overflow: "hidden",
        },
      ]}
    >
      <div css={[{ gridColumn: "span 6", position: "relative" }]}>
        <Text typography="newh1">Shop</Text>
        <Text css={[{ marginTop: 30 }]}>
          Limited-edition playing cards
          <br /> and exclusive bundles created by visionary artists.
        </Text>
        <div css={[{ marginTop: 30, display: "flex", gap: 30, alignItems: "center" }]}>
          <Link href="#playing-cards">
            <ButtonTemplate
              bordered={true}
              css={(theme) => [
                {
                  fontSize: 20,
                },
              ]}
            >
              Playing Cards
            </ButtonTemplate>
          </Link>
          <Link href="#bundles">
            <ArrowButton base size="small" noColor>
              Bundles
            </ArrowButton>
          </Link>
        </div>
        <img
          src="https://s3.amazonaws.com/img.playingarts.com/www/products/deck-special-02.png"
          alt=""
          css={[
            {
              width: 960,
              height: 600,
              position: "absolute",
              objectFit: "cover",
              "@keyframes ShopHeroFadeIn": {
                "0%": {
                  opacity: 0.3,
                  top: -50,
                  left: 570,
                },
                "100%": {
                  opacity: 1,
                  top: -75,
                  left: 555,
                },
              },
              animation: "ShopHeroFadeIn 500ms forwards linear",
            },
          ]}
        />
      </div>
    </Grid>
  );
};

export default Hero;
