import { FC, HTMLAttributes, useState } from "react";
import Image from "next/image";
import Grid from "../../../Grid";
import ScandiBlock from "../../../ScandiBlock";
import Text from "../../../Text";
import ButtonTemplate from "../../../Buttons/Button";
import ArrowedButton from "../../../Buttons/ArrowedButton";
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
          borderRadius: theme.spacing(2),
          position: "relative",
          [theme.maxMQ.xsm]: {
            gridColumn: "1 / -1",
            aspectRatio: "1/1",
          },
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

const AugmentedReality: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => (
  <Grid
    css={(theme) => [
      {
        position: "relative",
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
        [theme.maxMQ.xsm]: {
          paddingTop: theme.spacing(3),
          paddingBottom: theme.spacing(6),
        },
      },
    ]}
    id="ar"
    {...props}
  >
    <ScandiBlock
      palette="light"
      css={(theme) => [
        {
          gridColumn: "span 6",
          display: "block",
          paddingTop: 15,
          [theme.maxMQ.xsm]: {
            gridColumn: "1 / -1",
            paddingBottom: theme.spacing(3),
          },
        },
      ]}
    >
      <ArrowedButton>Augmented Reality</ArrowedButton>
      <Text
        css={(theme) => [
          {
            paddingRight: 30,
            paddingTop: 100,
            color: theme.colors.dark_gray,
            [theme.maxMQ.xsm]: {
              paddingTop: theme.spacing(5),
              paddingRight: 0,
            },
          },
        ]}
      >
        Experience cards like never before! <br /> Use the Playing Arts AR™ app
        to watch selected cards come alive with breathtaking animations— right
        in your hands.
      </Text>
      <div css={(theme) => ({ paddingTop: 90, [theme.maxMQ.xsm]: { paddingTop: theme.spacing(3) } })}>
        <Text
          typography="paragraphSmall"
          css={(theme) => [{ marginBottom: theme.spacing(3), color: theme.colors.dark_gray }]}
        >
          Download free
          <br />
          Playing Arts AR™ mobile app
        </Text>
        <a
          href="https://apps.apple.com/es/app/playing-arts/id1594901668?l=en"
          target="_blank"
          rel="noopener noreferrer"
          css={{ textDecoration: "none", marginRight: 15 }}
        >
          <ButtonTemplate
            size="medium"
            css={{
              paddingLeft: 10,
            }}
          >
            <Apple
              css={{
                marginRight: 10,
              }}
            />
            iPhone
          </ButtonTemplate>
        </a>

        <a
          href="https://play.google.com/store/apps/details?id=com.digitalabstractsapps.playingarts&hl=en"
          target="_blank"
          rel="noopener noreferrer"
          css={{ textDecoration: "none" }}
        >
          <ButtonTemplate
            size="medium"
            css={{
              paddingLeft: 10,
            }}
          >
            <Android
              css={{
                marginRight: 10,
              }}
            />
            Android
          </ButtonTemplate>
        </a>
      </div>
    </ScandiBlock>
    <Presentation />
  </Grid>
);

export default AugmentedReality;
