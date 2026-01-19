import { FC, HTMLAttributes, useState } from "react";
import Image from "next/image";
import Grid from "../../../Grid";
import Text from "../../../Text";
import ButtonTemplate from "../../../Buttons/Button";
import ArrowButton from "../../../Buttons/ArrowButton";
import Link from "../../../Link";

const Hero: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

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
          Limited-edition playing cards and exclusive
          <br /> bundles created by visionary artists.
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
        <div
          css={[
            {
              width: 960,
              height: 600,
              position: "absolute",
              top: -50,
              left: 570,
              opacity: 0,
              transition: "opacity 500ms ease, top 500ms ease, left 500ms ease",
            },
          ]}
          style={
            imageLoaded
              ? { opacity: 1, top: -75, left: 555 }
              : undefined
          }
        >
          <Image
            src="https://s3.amazonaws.com/img.playingarts.com/www/products/deck-special-02.png"
            alt="Shop hero deck"
            width={960}
            height={600}
            priority
            quality={90}
            style={{ objectFit: "cover" }}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </div>
    </Grid>
  );
};

export default Hero;
