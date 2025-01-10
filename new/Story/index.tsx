import { FC, HTMLAttributes } from "react";
import Grid from "../../components/Grid";
import ButtonTemplate from "../Buttons/Templates/ButtonTemplate";
import IconArrow from "../Icons/IconArrow";
import Text from "../Text";
import CardSmall from "./CardSmall";

const Story: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => (
  <>
    <div css={{ position: "relative" }}>
      <CardSmall />
      <Grid
        css={(theme) => [
          {
            background: theme.colors.soft_gray,
            paddingTop: 30,
            paddingBottom: 120,
            gridColumn: "1/-1",
          },
        ]}
      >
        <div css={[{ gridColumn: "7/-1" }]}>
          <ButtonTemplate
            css={(theme) => [
              {
                padding: "0 0",
                color: theme.colors.dark_gray,
              },
            ]}
          >
            <IconArrow css={[{ marginRight: 10 }]} />
            Where art meets play
          </ButtonTemplate>
          <Text typography="paragraphBig" css={[{ paddingTop: 120 }]}>
            Playing Arts brings together artists from around the world,
            transforming traditional playing cards into a diverse gallery of
            creative expression.
          </Text>
          <Grid auto={true} css={[{ paddingTop: 30 }]}>
            {[
              ["12", "years"],
              ["08", "editions"],
              ["100+", "artists"],
            ].map((data) => (
              <div css={[{ gridColumn: "span 2" }]}>
                <hr css={[{ width: "100%", marginBottom: 15 }]} />
                <Text typography="paragraphBig">{data[0]}</Text>
                <Text>{data[1]}</Text>
              </div>
            ))}
          </Grid>
          <div css={[{ display: "flex", gap: 30, "> *": { flex: 1 } }]}></div>
        </div>
      </Grid>
      <Grid
        css={(theme) => [
          { background: theme.colors.pale_gray, gridColumn: "1/-1" },
        ]}
      >
        <div css={[{ gridColumn: "7/-1", paddingTop: 30 }]}>
          <Text typography="paragraphBig">Explore the collection</Text>
          <Text typography="paragraphBig" css={[{ padding: "120px 0" }]}>
            Eight editions where each deck is a curated showcase of 55 unique
            artworks, created by 55 different international artists.
          </Text>
        </div>
      </Grid>
    </div>
  </>
);

export default Story;
