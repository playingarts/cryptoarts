import { FC, HTMLAttributes } from "react";
import Grid from "../../../../components/Grid";
import Text from "../../../Text";
import CardSmall from "./CardSmall";
import ArrowedButton from "../../../Buttons/ArrowedButton";

const Story: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => (
  <div css={{ position: "relative", contain: "paint" }} {...props}>
    <CardSmall />
    <Grid
      css={(theme) => [
        {
          background: theme.colors.soft_gray,
          paddingTop: 30,
          paddingBottom: 120,
          gridColumn: "1/-1",
          [theme.maxMQ.sm]: {
            paddingLeft: 20,
            paddingRight: 20,
          },
        },
      ]}
    >
      <div
        css={(theme) => [
          {
            gridColumn: "span 6/-1",
            zIndex: 0,
            [theme.maxMQ.sm]: {
              zIndex: 2,
            },
            position: "relative",
          },
        ]}
      >
        <ArrowedButton>Where art meets play</ArrowedButton>
        <Text typography="paragraphBig" css={[{ paddingTop: 120 }]}>
          Playing Arts brings together artists from around the world,
          transforming traditional playing cards into a diverse gallery of
          creative expression.
        </Text>
        <Grid auto={true} css={[{ paddingTop: 60 }]}>
          {[
            ["12", "Years"],
            ["08", "Editions"],
            ["1100+", "Artists"],
          ].map((data) => (
            <div
              key={JSON.stringify(data)}
              css={(theme) => [
                {
                  gridColumn: "span 2",
                  paddingTop: 15,
                  boxShadow: "0px -1px 0px rgba(0, 0, 0, 1)",
                },
              ]}
            >
              <Text typography="newh3">{data[0]}</Text>
              <Text typography="newh4">{data[1]}</Text>
            </div>
          ))}
        </Grid>
        <div css={[{ display: "flex", gap: 30, "> *": { flex: 1 } }]}></div>
      </div>
    </Grid>
    <Grid
      css={(theme) => [
        {
          background: theme.colors.pale_gray,
          gridColumn: "1/-1",
          [theme.maxMQ.sm]: {
            paddingLeft: 20,
            paddingRight: 20,
          },
        },
      ]}
    >
      <div
        css={(theme) => [
          {
            gridColumn: "span 6/-1",
            paddingTop: 30,
            zIndex: 0,
            [theme.maxMQ.sm]: {
              zIndex: 2,
            },
            position: "relative",
          },
        ]}
      >
        <Text typography="newh4">Explore the collection</Text>
        <Text typography="paragraphBig" css={[{ padding: "120px 0" }]}>
          Eight editions where each deck is a curated showcase of 55 unique
          artworks, created by 55 different international artists.
        </Text>
      </div>
    </Grid>
  </div>
);

export default Story;
