import { FC, HTMLAttributes } from "react";
import Grid from "../../../../components/Grid";
import { useDailyCard } from "../../../../hooks/card";
import image1 from "../../../../mocks/images/homeGallery/1.png";
import image2 from "../../../../mocks/images/homeGallery/2.png";
import image3 from "../../../../mocks/images/homeGallery/3.png";
import image4 from "../../../../mocks/images/homeGallery/4.png";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import ArrowButton from "../../../Buttons/ArrowButton";
import KickStarter from "../../../Icons/KickStarter";
import ScandiBlock from "../../../ScandiBlock";
import Text from "../../../Text";
import background from "../../../../mocks/images/backgroundImage.png";
import { useSize } from "../../../../components/SizeProvider";
import { breakpoints } from "../../../../source/enums";

const Gallery: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { dailyCard } = useDailyCard();
  const { width } = useSize();
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
        css={(theme) => [
          {
            gridColumn: "span 6",
            alignItems: "start",
            paddingTop: 15,
            [theme.maxMQ.sm]: {
              marginLeft: 20,
              marginRight: 20,
            },
          },
        ]}
      >
        <ArrowedButton>Every card, a masterpiece you can hold</ArrowedButton>
      </ScandiBlock>

      <ScandiBlock
        css={(theme) => [
          {
            gridColumn: "span 6",
            display: "block",
            paddingTop: 15,
            [theme.maxMQ.sm]: {
              marginLeft: 20,
              marginRight: 20,
              marginTop: 30,
              boxShadow: "none",
            },
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
        {width >= breakpoints.sm ? (
          <Text
            css={[{ paddingBottom: 15, marginTop: 150 }]}
            typography="newh4"
          >
            Card of the day
          </Text>
        ) : null}
      </ScandiBlock>

      <Grid
        css={(theme) => [
          {
            gridColumn: "1/-1",
            gap: 30,
            img: { background: " white", borderRadius: 16 },
            [theme.maxMQ.sm]: {
              marginTop: 60,
              paddingRight: 20,
              paddingLeft: 20,
            },
          },
        ]}
      >
        <img
          css={[
            {
              gridColumn: "span 3",
              aspectRatio: "1/1",
              width: "100%",
              objectFit: "cover",
            },
          ]}
          src={image1.src}
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
          src={image2.src}
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
          src={background.src}
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
          src={image3.src}
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
          src={image4.src}
          alt=""
        />

        <div
          css={(theme) => [
            {
              background: theme.colors.soft_gray,
              gridColumn: "span 3",

              aspectRatio: "1/1",
              width: "100%",

              [theme.maxMQ.sm]: {
                gridColumn: "1/-1",
              },
              objectFit: "cover",
              padding: 30,
              display: "grid",
              alignItems: "end",
              borderRadius: 15,
            },
          ]}
        >
          <KickStarter />

          <ArrowButton size="small" base={true} noColor={true}>
            5x Kickstarter funded
          </ArrowButton>
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

          <ArrowButton
            size="small"
            noColor={true}
            base={true}
            css={[{ marginTop: 30 }]}
          >
            Discover the artwork
          </ArrowButton>
        </div>
      </Grid>
    </Grid>
  );
};
export default Gallery;
