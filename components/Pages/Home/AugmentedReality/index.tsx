import { FC, HTMLAttributes, useState } from "react";
import Image from "next/image";
import Grid from "../../../Grid";
import ScandiBlock from "../../../ScandiBlock";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import Text from "../../../Text";
import ButtonTemplate from "../../../Buttons/Button";
import Apple from "../../../Icons/Apple";
import Android from "../../../Icons/Android";
import AR from "../../../../mocks/images/AR.png";
import Zoom from "../../../Zoom";

const Presentation = () => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      css={(theme) => [
        {
          gridColumn: "span 6",
          background: theme.colors.accent,
          borderRadius: 20,
          position: "relative",
        },
      ]}
    >
      <Image
        src={AR}
        alt="Augmented Reality preview"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ objectFit: "cover" }}
      />
      <Zoom
        css={[{ position: "absolute", right: 15, bottom: 15 }]}
        style={{ opacity: hover ? 1 : 0 }}
      />
    </div>
  );
};

// Shader disabled due to WebGL compilation errors
const Shader = () => null;

const AugmentedReality: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => (
  <Grid
    css={(theme) => [
      {
        position: "relative",
        padding: "30px 20px",
        [theme.mq.sm]: {
          padding: "60px 75px",
        },
      },
    ]}
    id="ar"
    {...props}
  >
    <Shader />
    <ScandiBlock
      palette="light"
      css={(theme) => [
        {
          gridColumn: "span 6",
          display: "block",
          paddingTop: 15,
        },
      ]}
    >
      <ArrowedButton
        css={(theme) => [{ textAlign: "start", color: theme.colors.dark_gray }]}
      >
        Augmented Reality
      </ArrowedButton>
      <Text
        css={(theme) => [
          {
            paddingRight: 30,
            paddingTop: 100,
            color: theme.colors.dark_gray,
          },
        ]}
      >
        Experience cards like never before! <br /> Use the Playing Arts AR™ app
        to watch selected cards come alive with breathtaking animations— right
        in your hands.
      </Text>
      <div css={{ paddingTop: 90 }}>
        <Text
          typography="paragraphSmall"
          css={(theme) => [{ marginBottom: 30, color: theme.colors.dark_gray }]}
        >
          Download free
          <br />
          Playing Arts AR™ mobile app
        </Text>
        <ButtonTemplate
          css={(theme) => [
            {
              paddingLeft: 10,
              marginRight: 15,
            },
          ]}
        >
          <Apple
            css={{
              marginRight: 10,
            }}
          />
          iPhone
        </ButtonTemplate>

        <ButtonTemplate
          css={(theme) => [
            {
              paddingLeft: 10,
            },
          ]}
        >
          <Android
            css={{
              marginRight: 10,
            }}
          />
          Android
        </ButtonTemplate>
      </div>
    </ScandiBlock>
    <Presentation />
  </Grid>
);

export default AugmentedReality;
