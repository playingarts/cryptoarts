import { FC, HTMLAttributes } from "react";
import Grid from "../../../../components/Grid";
import Text from "../../../Text";
import ButtonTemplate from "../../../Buttons/Button";
import NewLink from "../../../Link/NewLink";
import ArrowButton from "../../../Buttons/ArrowButton";

const Hero: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => (
  <Grid
    css={(theme) => [
      {
        paddingTop: 235,
        paddingBottom: 60,
        background: theme.colors.soft_gray,
        position: "relative",
        overflow: "hidden",
      },
    ]}
  >
    <div css={[{ gridColumn: "span 6" }]}>
      <Text typography="newh1">Shop</Text>
      <Text css={[{ marginTop: 30 }]}>
        Limited-edition playing cards, uncut sheets,
        <br /> and exclusive bundles created by visionary artists.
      </Text>
      <div css={[{ marginTop: 30, display: "flex", gap: 30 }]}>
        <ButtonTemplate
          bordered={true}
          css={(theme) => [
            {
              // color: "white",
            },
          ]}
        >
          Playing cards
        </ButtonTemplate>
        <ArrowButton base size="small" noColor>
          Uncut sheets
        </ArrowButton>
        <ArrowButton base size="small" noColor>
          Bundles
        </ArrowButton>
      </div>
    </div>

    <img
      src="https://s3.amazonaws.com/img.playingarts.com/www/products/deck-special-02.png"
      alt=""
      css={[
        {
          width: 960,
          height: 600,
          //   width: 630,
          //   height: 468,
          position: "absolute",
          gridColumn: "span 6",
          objectFit: "cover",
          transform: "translate(-110px,125px)",
          opacity: 0.3,
        },
      ]}
    />
  </Grid>
);

export default Hero;
