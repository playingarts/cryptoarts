import { FC, HTMLAttributes } from "react";
import Grid from "../../../../components/Grid";
import { useDailyCard } from "../../../../hooks/card";
import placeholder from "../../../../mocks/images/deckCollectionPreview.png";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import ArrowButton from "../../../Buttons/ArrowButton";
import Dot from "../../../Icons/Dot";
import KickStarter from "../../../Icons/KickStarter";
import ScandiBlock from "../../../ScandiBlock";
import Text from "../../../Text";

const Gallery: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { dailyCard } = useDailyCard();
  return (
    <Grid
      css={(theme) => [
        {
          background: theme.colors.pale_gray,
          paddingTop: 60,
          paddingBottom: 150,
        },
      ]}
      {...props}
    >
      <ScandiBlock
        css={[{ gridColumn: "span 6", alignItems: "start", paddingTop: 15 }]}
      >
        <ArrowedButton>Every card, a masterpiece you can hold</ArrowedButton>
      </ScandiBlock>

      <ScandiBlock
        css={[
          {
            gridColumn: "span 6",
            display: "block",
            height: 370,
            paddingTop: 15,
          },
        ]}
      >
        <Text typography="paragraphBig">
          Carefully crafted on legendary Bicycle® paper for unparalleled
          artistry and tactile quality.
        </Text>
        <ArrowButton color="accent" css={[{ marginTop: 30 }]}>
          Shop the collection
        </ArrowButton>
      </ScandiBlock>

      <Grid
        css={[
          {
            gridColumn: "1/-1",
            img: { background: " white", borderRadius: 16 },
          },
        ]}
      >
        <Text css={[{ gridColumn: "span 6 / -1" }]}>Card of the day</Text>
        <img
          css={[
            {
              gridColumn: "span 3",
              aspectRatio: "1/1",
              width: "100%",
              objectFit: "cover",
            },
          ]}
          src={placeholder.src}
          alt=""
        />
        <img
          css={[
            {
              gridColumn: "span 3",
              aspectRatio: "1/1",
              width: "100%",
              objectFit: "cover",
            },
          ]}
          src={placeholder.src}
          alt=""
        />
        <img
          css={[
            {
              gridColumn: "span 6",
              gridRow: "span 2",
              aspectRatio: "1/1",
              width: "100%",
              objectFit: "cover",
            },
          ]}
          src={(dailyCard && dailyCard.cardBackground) || ""}
          alt=""
        />
        <img
          css={[
            {
              gridColumn: "span 3",
              aspectRatio: "1/1",
              width: "100%",
              objectFit: "cover",
            },
          ]}
          src={placeholder.src}
          alt=""
        />
        <img
          css={[
            {
              gridColumn: "span 3",
              aspectRatio: "1/1",
              width: "100%",
              objectFit: "cover",
            },
          ]}
          src={placeholder.src}
          alt=""
        />

        <div
          css={[
            {
              gridColumn: "span 3",
              aspectRatio: "1/1",
              width: "100%",
              objectFit: "cover",
              padding: 30,
              display: "grid",
              alignItems: "end",
            },
          ]}
        >
          <KickStarter />
          <Text typography="linkNewTypography" css={[{ marginTop: 30 }]}>
            5x Kickstarter funded <Dot />
          </Text>
        </div>
        <div css={[{ gridColumn: "span 6/-1", marginTop: 30 }]}>
          <div css={[{ display: "flex", gap: 30 }]}>
            <img
              src={dailyCard && dailyCard.artist.userpic}
              alt=""
              css={{ width: 80, height: 80 }}
            />
            <div>
              <Text typography="paragraphBig">
                {dailyCard && dailyCard.artist.name}
              </Text>
              <Text typography="paragraphSmall">
                {dailyCard && dailyCard.artist.country}
              </Text>
            </div>
          </div>
          <Text typography="newParagraph" css={[{ marginTop: 60 }]}>
            {dailyCard && dailyCard.info}
          </Text>

          <Text typography="linkNewTypography" css={[{ marginTop: 30 }]}>
            Discover the artwork <Dot />
          </Text>
        </div>
      </Grid>
    </Grid>
  );
};
export default Gallery;
