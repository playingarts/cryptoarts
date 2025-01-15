import { FC, HTMLAttributes } from "react";
import Grid from "../../../components/Grid";
import ShadertoyReact from "shadertoy-react";
import frag from "../../../Shaders/Xemantic/index.glsl";
import ScandiBlock from "../../ScandiBlock";
import ArrowedButton from "../../Buttons/ArrowedButton";
import Text from "../../Text";
import ButtonTemplate from "../../Buttons/Templates/ButtonTemplate";
import Apple from "../../Icons/Apple";
import Android from "../../Icons/Android";

const AugmentedReality: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => (
  <Grid css={[{ position: "relative", padding: "60px 75px" }]}>
    <ShadertoyReact
      fs={frag}
      style={{
        zIndex: -1,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    />
    <ScandiBlock
      css={(theme) => [
        {
          gridColumn: "span 6",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "start",
          paddingTop: 15,
        },
      ]}
    >
      <ArrowedButton>Augmented Reality</ArrowedButton>
      <Text>
        Experience cards like never before! <br /> Use the Playing Arts AR™ app
        to watch selected cards come alive with breathtaking animations—right in
        your hands.
      </Text>
      <div>
        <Text typography="paragraphSmall">
          Download free
          <br />
          Playing Arts AR™ mobile app
        </Text>
        <div css={[{ display: "inline-block", marginTop: 30 }]}>
          <ButtonTemplate
            css={(theme) => [
              {
                color: "white",
                background: theme.colors.dark_gray,
                paddingRight: 15,
                marginRight: 15,
                "&:hover": {
                  background: theme.colors.dark_gray_hover,
                },
              },
            ]}
          >
            <Apple /> iPhone
          </ButtonTemplate>

          <ButtonTemplate
            css={(theme) => [
              {
                color: "white",
                background: theme.colors.dark_gray,
                paddingRight: 15,
                "&:hover": {
                  background: theme.colors.dark_gray_hover,
                },
              },
            ]}
          >
            <Android /> Android
          </ButtonTemplate>
        </div>
      </div>
    </ScandiBlock>
    <div
      css={(theme) => [
        {
          gridColumn: "span 6",
          background: theme.colors.accent,
          height: 535,
          borderRadius: 20,
        },
      ]}
    ></div>
  </Grid>
);

export default AugmentedReality;
