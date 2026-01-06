import { FC, HTMLAttributes, useState } from "react";
import Grid from "../../../Grid";
import ShadertoyReact from "shadertoy-react";
import frag from "../../../../Shaders/Xemantic/index.glsl";
import ScandiBlock from "../../../ScandiBlock";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import Text from "../../../Text";
import ButtonTemplate from "../../../Buttons/Button";
import Apple from "../../../Icons/Apple";
import Android from "../../../Icons/Android";
import AR from "../../../../mocks/images/AR.png";
import Zoom from "../../../Zoom";
import { useSize } from "../../../SizeProvider";
import { breakpoints } from "../../../../source/enums";

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
      <img src={AR.src} alt="" css={[{ height: "100%", width: "100%" }]} />
      <Zoom
        css={[{ position: "absolute", right: 15, bottom: 15 }]}
        style={{ opacity: hover ? 1 : 0 }}
      />
    </div>
  );
};

const Shader = () => {
  const { width } = useSize();
  return (
    <ShadertoyReact
      fs={frag}
      style={{
        zIndex: -1,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        ...(width < breakpoints.sm && { opacity: 0 }),
      }}
    />
  );
};

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
