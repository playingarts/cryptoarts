import { FC, HTMLAttributes, RefObject } from "react";
import Grid from "../../../../components/Grid";
import ScandiBlock from "../../../ScandiBlock";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import Text from "../../../Text";
import ButtonTemplate from "../../../Buttons/Templates/ButtonTemplate";
import Dot from "../../../Icons/Dot";
import Arrow from "../../../Icons/Arrow";

const Intro: FC<
  HTMLAttributes<HTMLElement> & {
    carouselRef: RefObject<HTMLDivElement | null>;
  }
> = ({ carouselRef, ...props }) => (
  <Grid css={[{ padding: "60px 0", overflow: "hidden" }]}>
    <ScandiBlock
      css={[{ gridColumn: "span 6", paddingTop: 15, alignItems: "start" }]}
    >
      <ArrowedButton>1,000+ Five-of-Stars reviews</ArrowedButton>
    </ScandiBlock>
    <ScandiBlock
      css={[
        {
          gridColumn: "span 6",
          paddingTop: 15,
          height: 370,
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "start",
        },
      ]}
    >
      <div>
        <Text typography="paragraphBig">
          Discover why collectors, players and art connoisseurs can’t get
          enough.
        </Text>
        <div css={[{ marginTop: 30, display: "flex", gap: 30 }]}>
          <ButtonTemplate
            css={(theme) => [
              {
                color: theme.colors.dark_gray,
                border: `currentColor solid 1px`,
              },
            ]}
          >
            Leave a review
          </ButtonTemplate>
          <Text typography="linkNewTypography">
            Read all stories <Dot />
          </Text>
        </div>
      </div>
      <div
        css={[
          {
            display: "flex",
            gap: 5,
            "> *": {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 45,
              height: 45,
              background: "white",
              borderRadius: "100%",
            },
          },
        ]}
      >
        <div
          css={(theme) => [
            {
              transform: "rotate(180deg)",
              userSelect: "none",
              "&:hover": {
                cursor: "pointer",
                background: theme.colors.dark_gray,
                color: "white",
              },
            },
          ]}
          onClick={() => {
            carouselRef.current &&
              carouselRef.current.scrollBy({
                behavior: "smooth",
                left: -580,
              });
          }}
        >
          <Arrow />
        </div>
        <div
          css={(theme) => [
            {
              userSelect: "none",
              "&:hover": {
                cursor: "pointer",
                background: theme.colors.dark_gray,
                color: "white",
              },
            },
          ]}
          onClick={() => {
            carouselRef.current &&
              carouselRef.current.scrollBy({
                behavior: "smooth",
                left: 580,
              });
          }}
        >
          <Arrow />
        </div>
      </div>
    </ScandiBlock>
  </Grid>
);

export default Intro;
