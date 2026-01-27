import { FC, HTMLAttributes, useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { keyframes } from "@emotion/react";
import Grid from "../../../Grid";
import { useDailyCardLite, usePrefetchCardsForDeck, useRandomRightBottomPhoto } from "../../../../hooks/card";
import Link from "../../../Link";
import { setNavigationCard } from "../../CardPage/navigationCardStore";
import image4 from "../../../../mocks/images/homeGallery/4.png";
import ArrowButton from "../../../Buttons/ArrowButton";
import KickStarter from "../../../Icons/KickStarter";
import Text from "../../../Text";
import Intro from "../../../Intro";

/** Static featured photos for bottom-left rotating slot */
type FeaturedPhoto = { photo: string; href: string };
const FEATURED_PHOTOS: FeaturedPhoto[] = [
  { photo: "https://s3.amazonaws.com/img.playingarts.com/card-photos/680001862284ec07522bb3f2/additional-1769183290052.jpg", href: "/three/burnt-toast-creative" },
  { photo: "https://s3.amazonaws.com/img.playingarts.com/card-photos/680001822284ec07522bb31b/additional-1769186762900.jpg", href: "/one/sara-blake" },
  { photo: "https://s3.amazonaws.com/img.playingarts.com/card-photos/680001822284ec07522bb317/additional-1769186650153.jpg", href: "/one/conrad-roset" },
  { photo: "https://s3.amazonaws.com/img.playingarts.com/card-photos/680001822284ec07522bb311/additional-1769186534827.jpg", href: "/one/lei-melendres" },
  { photo: "https://s3.amazonaws.com/img.playingarts.com/card-photos/680001822284ec07522bb2fc/additional-1769185762508.jpg", href: "/one/valerie-ann-chua" },
  { photo: "https://s3.amazonaws.com/img.playingarts.com/card-photos/680001842284ec07522bb398/additional-1769182431703.jpg", href: "/two/yeaaah-studio" },
  { photo: "https://s3.amazonaws.com/img.playingarts.com/card-photos/680001842284ec07522bb394/additional-1769182311916.jpg", href: "/two/sara-blake" },
  { photo: "https://s3.amazonaws.com/img.playingarts.com/card-photos/680001842284ec07522bb38c/additional-1769182138729.jpg", href: "/two/marcelo-schultz" },
  { photo: "https://s3.amazonaws.com/img.playingarts.com/card-photos/680001842284ec07522bb39b/additional-1769182510094.jpg", href: "/two/alexis-marcou" },
  { photo: "https://s3.amazonaws.com/img.playingarts.com/card-photos/680001862284ec07522bb422/additional-1769184545274.jpg", href: "/three/wes-art-studio" },
  { photo: "https://s3.amazonaws.com/img.playingarts.com/card-photos/680001862284ec07522bb405/additional-1769183713706.jpg", href: "/three/andreas-preis" },
  { photo: "https://s3.amazonaws.com/img.playingarts.com/card-photos/680001862284ec07522bb408/additional-1769183769687.jpg", href: "/three/will-scobie" },
  { photo: "https://s3.amazonaws.com/img.playingarts.com/card-photos/680001862284ec07522bb40f/additional-1769184094079.jpg", href: "/three/grzegorz-domaradzki" },
];

/** Fade in animation */
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

/** Rotation interval in ms */
const ROTATION_INTERVAL = 5000;

/**
 * Linked rotating photo slot with click-through links.
 * Each photo links to its card page.
 */
const LinkedRotatingPhotoSlot: FC<{ items: FeaturedPhoto[] }> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedPhotos, setLoadedPhotos] = useState<Set<string>>(new Set());
  const [showNext, setShowNext] = useState(false);

  const preloadImage = useCallback((src: string): Promise<void> => {
    return new Promise((resolve) => {
      if (loadedPhotos.has(src)) {
        resolve();
        return;
      }
      const img = new window.Image();
      img.onload = () => {
        setLoadedPhotos((prev) => new Set(prev).add(src));
        resolve();
      };
      img.onerror = () => resolve();
      img.src = src;
    });
  }, [loadedPhotos]);

  useEffect(() => {
    if (items.length === 0) return;

    const preload = async () => {
      const current = items[currentIndex]?.photo;
      if (current) await preloadImage(current);

      const nextIdx = (currentIndex + 1) % items.length;
      const next = items[nextIdx]?.photo;
      if (next) await preloadImage(next);

      if (items.length > 2) {
        const aheadIdx = (currentIndex + 2) % items.length;
        const ahead = items[aheadIdx]?.photo;
        if (ahead) await preloadImage(ahead);
      }
    };

    preload();
  }, [items, currentIndex, preloadImage]);

  useEffect(() => {
    if (items.length <= 1) return;

    const currentPhoto = items[currentIndex]?.photo;
    const nextIdx = (currentIndex + 1) % items.length;
    const nextPhoto = items[nextIdx]?.photo;

    if (!currentPhoto || !loadedPhotos.has(currentPhoto)) return;
    if (!nextPhoto || !loadedPhotos.has(nextPhoto)) return;

    const timer = setInterval(() => {
      setShowNext(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
        setShowNext(false);
      }, 600);
    }, ROTATION_INTERVAL);

    return () => clearInterval(timer);
  }, [items, currentIndex, loadedPhotos]);

  const currentItem = items[currentIndex];
  const nextIdx = (currentIndex + 1) % items.length;
  const nextItem = items[nextIdx];

  if (!currentItem?.photo || !loadedPhotos.has(currentItem.photo)) {
    return (
      <div
        css={(theme) => ({
          width: "100%",
          height: "100%",
          background: theme.colors.soft_gray,
          borderRadius: 16,
        })}
      />
    );
  }

  return (
    <Link
      href={currentItem.href}
      css={(theme) => ({
        display: "block",
        width: "100%",
        height: "100%",
        background: theme.colors.soft_gray,
        borderRadius: 16,
        position: "relative",
        overflow: "hidden",
      })}
    >
      <img
        key={currentItem.photo}
        src={currentItem.photo}
        alt="Featured card artwork"
        css={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: 16,
        }}
      />
      {nextItem?.photo && loadedPhotos.has(nextItem.photo) && (
        <img
          key={nextItem.photo}
          src={nextItem.photo}
          alt="Featured card artwork"
          css={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 16,
            opacity: showNext ? 1 : 0,
            transition: "opacity 0.6s ease-in-out",
          }}
        />
      )}
    </Link>
  );
};

/** Main photo with fade-in animation */
const MainPhotoSlot: FC<{ src?: string | null; alt?: string }> = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  if (src) {
    return (
      <div
        css={(theme) => ({
          width: "100%",
          height: "100%",
          background: theme.colors.soft_gray,
          borderRadius: 16,
          position: "relative",
        })}
      >
        <img
          src={src}
          alt={alt || ""}
          onLoad={() => setLoaded(true)}
          css={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 16,
            opacity: loaded ? 1 : 0,
            animation: loaded ? `${fadeIn} 0.3s ease-out` : "none",
          }}
        />
      </div>
    );
  }

  return (
    <div
      css={(theme) => ({
        width: "100%",
        height: "100%",
        background: theme.colors.soft_gray,
        borderRadius: 16,
      })}
    />
  );
};

// Skeleton for loading state
const DailyCardSkeleton: FC = () => (
  <div css={(theme) => [{ gridColumn: "span 6/-1", marginTop: theme.spacing(3), [theme.maxMQ.xsm]: { flex: "1 1 100%", order: 11, marginTop: theme.spacing(2) } }]}>
    <div css={(theme) => [{ display: "flex", gap: theme.spacing(3) }]}>
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
        marginTop: theme.spacing(6),
      })}
    />
    <div
      css={(theme) => ({
        width: 150,
        height: 20,
        borderRadius: 4,
        background: theme.colors.soft_gray,
        marginTop: theme.spacing(3),
      })}
    />
  </div>
);

const Gallery: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { dailyCard, loading } = useDailyCardLite();
  const { prefetch } = usePrefetchCardsForDeck();
  const { photo: rightBottomPhoto } = useRandomRightBottomPhoto();

  // Prefetch cards for deck on hover (warms Apollo cache)
  const handleLinkMouseEnter = useCallback(() => {
    if (dailyCard?.deck?.slug) {
      prefetch(dailyCard.deck.slug);
    }
  }, [dailyCard?.deck?.slug, prefetch]);

  // Store card data for instant display on card page
  const handleLinkClick = useCallback(() => {
    if (dailyCard) {
      setNavigationCard({
        _id: dailyCard._id,
        img: "", // DailyCardLite doesn't have img - will load from SSR
        video: null,
        info: dailyCard.info || null,
        background: null,
        cardBackground: null,
        edition: null,
        deck: { slug: dailyCard.deck?.slug || "" },
        artist: {
          name: dailyCard.artist?.name || "",
          slug: dailyCard.artist?.slug || "",
          country: dailyCard.artist?.country || null,
          userpic: dailyCard.artist?.userpic || null,
          info: null,
          social: null,
        },
      });
    }
  }, [dailyCard]);

  return (
    <div
      css={(theme) => [
        {
          background: theme.colors.pale_gray,
          paddingTop: theme.spacing(6),
          paddingBottom: theme.spacing(6),
          [theme.maxMQ.xsm]: {
            paddingTop: theme.spacing(3),
            paddingBottom: 0,
          },
        },
      ]}
      {...props}
    >
      <Intro
        arrowedText="A masterpiece you can hold"
        paragraphText="Carefully crafted on legendary Bicycle® paper for unparalleled artistry and tactile quality."
        beforeLinkNew={
          <ArrowButton href="/shop" color="accent" size="medium">
            Shop the collection
          </ArrowButton>
        }
        bottom={
          <Text
            css={(theme) => [{ paddingBottom: 15, marginTop: 150, [theme.maxMQ.xsm]: { display: "none" } }]}
            typography="h4"
          >
            Card of the day
          </Text>
        }
      />

      <Grid
        css={(theme) => [
          {
            gridColumn: "1/-1",
            gap: theme.spacing(3),
            img: { background: " white", borderRadius: 16 },
            [theme.maxMQ.xsm]: {
              display: "flex",
              flexWrap: "wrap",
              gap: theme.spacing(1),
              "> *": {
                flex: "1 1 45%",
                minWidth: 0,
                aspectRatio: "1/1",
              },
            },
          },
        ]}
      >
        <Link href="/one/andreas-preis" css={{ gridColumn: "span 3", position: "relative", aspectRatio: "1/1", display: "block" }}>
          <img
            src="https://s3.amazonaws.com/img.playingarts.com/card-photos/680001822284ec07522bb320/main-1769212363022.jpg"
            alt="Playing Arts card showcase"
            css={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 16,
            }}
          />
        </Link>
        <Link
          href="/two/zipeng-zhu"
          css={{
            gridColumn: "span 3",
            position: "relative",
            aspectRatio: "1/1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "white",
            borderRadius: 16,
          }}
        >
          <img
            src="https://s3.amazonaws.com/img.playingarts.com/card-photos/680001842284ec07522bb373/additional-1769267271052.gif"
            alt="Animated card artwork by Zipeng Zhu"
            css={{
              width: "70%",
              height: "70%",
              objectFit: "cover",
              borderRadius: 12,
            }}
          />
        </Link>
        <div css={(theme) => ({
          gridColumn: "span 6",
          gridRow: "span 2",
          position: "relative",
          aspectRatio: "1/1",
          [theme.maxMQ.xsm]: {
            flex: "1 1 100% !important",
            width: "100%",
            order: 10,
          },
        })}>
          <MainPhotoSlot
            src={dailyCard?.mainPhoto}
            alt={dailyCard?.artist?.name ? `Card by ${dailyCard.artist.name}` : undefined}
          />
        </div>
        <div css={{ gridColumn: "span 3", position: "relative", aspectRatio: "1/1" }}>
          <LinkedRotatingPhotoSlot items={FEATURED_PHOTOS} />
        </div>
        <div css={{ gridColumn: "span 3", position: "relative", aspectRatio: "1/1" }}>
          {rightBottomPhoto ? (
            <img
              src={rightBottomPhoto}
              alt="Playing Arts design"
              css={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 16,
              }}
            />
          ) : (
            <Image
              src={image4}
              alt="Playing Arts design"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              style={{ objectFit: "cover", borderRadius: 16 }}
              loading="lazy"
            />
          )}
        </div>

        <div
          css={(theme) => [
            {
              background: theme.colors.soft_gray,
              gridColumn: "span 3",

              aspectRatio: "1/1",
              width: "100%",

              [theme.maxMQ.xsm]: {
                aspectRatio: "unset",
                height: 250,
                gap: theme.spacing(2),
                padding: theme.spacing(2),
              },
              objectFit: "cover",
              padding: theme.spacing(3),
              display: "grid",
              alignContent: "end",
              justifyItems: "start",
              gap: theme.spacing(3),
              borderRadius: theme.spacing(1.5),
            },
          ]}
        >
          <KickStarter />

          <ArrowButton size="small" base={true} noColor={true}>
            5x Kickstarter funded
          </ArrowButton>
        </div>
        {/* Mobile-only "Card of the day" title - between Kickstarter and main image */}
        <Text
          typography="h4"
          css={(theme) => ({
            display: "none",
            [theme.maxMQ.xsm]: {
              display: "block",
              flex: "1 1 100%",
              order: 9,
              marginTop: theme.spacing(6),
              marginBottom: theme.spacing(1),
              aspectRatio: "unset",
            },
          })}
        >
          Card of the day
        </Text>
        {loading || !dailyCard ? (
          <DailyCardSkeleton />
        ) : (
          <div css={(theme) => [{ gridColumn: "span 6/-1", marginTop: theme.spacing(3), paddingBottom: theme.spacing(6), [theme.maxMQ.xsm]: { flex: "1 1 100%", order: 11, marginTop: theme.spacing(2), paddingBottom: 0 } }]}>
            <div css={(theme) => [{ display: "flex", gap: theme.spacing(3), alignItems: "center" }]}>
              <img
                src={dailyCard.artist?.userpic}
                alt={dailyCard.artist?.name}
                css={{ width: 80, height: 80, borderRadius: "50%" }}
              />
              <div>
                <Text typography="h3">
                  {dailyCard.artist?.name}
                </Text>
                <Text typography="p-s">
                  {dailyCard.artist?.country}
                </Text>
              </div>
            </div>
            <Text
              typography="p"
              css={(theme) => ({
                marginTop: theme.spacing(3),
                display: "-webkit-box",
                WebkitLineClamp: 5,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              })}
            >
              {dailyCard.info}
            </Text>

            <ArrowButton
              href={`/${dailyCard.deck?.slug}/${dailyCard.artist?.slug}`}
              size="small"
              noColor={true}
              base={true}
              css={(theme) => [{ marginTop: theme.spacing(3) }]}
              onMouseEnter={handleLinkMouseEnter}
              onClick={handleLinkClick}
            >
              Discover the artwork
            </ArrowButton>
          </div>
        )}
      </Grid>
    </div>
  );
};
export default Gallery;
