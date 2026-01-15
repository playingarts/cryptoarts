import { FC, HTMLAttributes } from "react";
import Image from "next/image";
import Grid from "../../../Grid";
import { useDailyCardLite } from "../../../../hooks/card";
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
import { useSize } from "../../../SizeProvider";
import { breakpoints } from "../../../../source/enums";

// Skeleton for loading state
const DailyCardSkeleton: FC = () => (
  <div css={[{ gridColumn: "span 6/-1", marginTop: 30 }]}>
    <div css={[{ display: "flex", gap: 30 }]}>
      <div
        css={(theme) => ({
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: theme.colors.soft_gray,
        })}
      />
      <div>
        <div
          css={(theme) => ({
            width: 150,
            height: 20,
            borderRadius: 4,
            background: theme.colors.soft_gray,
            marginBottom: 8,
          })}
        />
        <div
          css={(theme) => ({
            width: 80,
            height: 16,
            borderRadius: 4,
            background: theme.colors.soft_gray,
          })}
        />
      </div>
    </div>
    <div
      css={(theme) => ({
        width: "100%",
        height: 60,
        borderRadius: 4,
        background: theme.colors.soft_gray,
        marginTop: 60,
      })}
    />
    <div
      css={(theme) => ({
        width: 150,
        height: 20,
        borderRadius: 4,
        background: theme.colors.soft_gray,
        marginTop: 30,
      })}
    />
  </div>
);

const Gallery: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { dailyCard, loading } = useDailyCardLite();
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
              // Mobile styles - to be implemented
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
              // Mobile styles - to be implemented
            },
          },
        ]}
      >
        <Text typography="paragraphBig">
          Carefully crafted on legendary Bicycle® paper for unparalleled
          artistry and tactile quality.
        </Text>
        <ArrowButton href="/shop" color="accent" css={[{ marginTop: 30 }]}>
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
              // Mobile styles - to be implemented
            },
          },
        ]}
      >
        <div css={{ gridColumn: "span 3", position: "relative", aspectRatio: "1/1" }}>
          <Image
            src={image1}
            alt="Playing Arts card showcase"
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            style={{ objectFit: "cover", borderRadius: 16 }}
            priority
          />
        </div>
        <div css={{ gridColumn: "span 3", position: "relative", aspectRatio: "1/1" }}>
          <Image
            src={image2}
            alt="Playing Arts card detail"
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            style={{ objectFit: "cover", borderRadius: 16 }}
            priority
          />
        </div>
        <div css={{ gridColumn: "span 6", gridRow: "span 2", position: "relative", aspectRatio: "1/1" }}>
          <Image
            src={background}
            alt="Playing Arts collection"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover", borderRadius: 16 }}
            loading="lazy"
          />
        </div>
        <div css={{ gridColumn: "span 3", position: "relative", aspectRatio: "1/1" }}>
          <Image
            src={image3}
            alt="Playing Arts artwork"
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            style={{ objectFit: "cover", borderRadius: 16 }}
            loading="lazy"
          />
        </div>
        <div css={{ gridColumn: "span 3", position: "relative", aspectRatio: "1/1" }}>
          <Image
            src={image4}
            alt="Playing Arts design"
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            style={{ objectFit: "cover", borderRadius: 16 }}
            loading="lazy"
          />
        </div>

        <div
          css={(theme) => [
            {
              background: theme.colors.soft_gray,
              gridColumn: "span 3",

              aspectRatio: "1/1",
              width: "100%",

              [theme.maxMQ.sm]: {
                // Mobile styles - to be implemented
              },
              objectFit: "cover",
              padding: 30,
              display: "grid",
              alignContent: "end",
              justifyItems: "start",
              gap: 30,
              borderRadius: 15,
            },
          ]}
        >
          <KickStarter />

          <ArrowButton size="small" base={true} noColor={true}>
            5x Kickstarter funded
          </ArrowButton>
        </div>
        {loading || !dailyCard ? (
          <DailyCardSkeleton />
        ) : (
          <div css={[{ gridColumn: "span 6/-1", marginTop: 30 }]}>
            <div css={[{ display: "flex", gap: 30 }]}>
              <img
                src={dailyCard.artist?.userpic}
                alt={dailyCard.artist?.name}
                css={{ width: 80, height: 80, borderRadius: "50%" }}
              />
              <div>
                <Text typography="paragraphBig">
                  {dailyCard.artist?.name}
                </Text>
                <Text typography="paragraphSmall">
                  {dailyCard.artist?.country}
                </Text>
              </div>
            </div>
            <Text
              typography="newParagraph"
              css={{
                marginTop: 30,
                display: "-webkit-box",
                WebkitLineClamp: 5,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {dailyCard.info}
            </Text>

            <ArrowButton
              href={`/${dailyCard.deck?.slug}/${dailyCard.artist?.slug}`}
              size="small"
              noColor={true}
              base={true}
              css={[{ marginTop: 30 }]}
            >
              Discover the artwork
            </ArrowButton>
          </div>
        )}
      </Grid>
    </Grid>
  );
};
export default Gallery;
