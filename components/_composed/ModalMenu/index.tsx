import { colord } from "colord";
import { useRouter } from "next/router";
import { FC, Fragment, HTMLAttributes, useLayoutEffect, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import { useDecks } from "../../../hooks/deck";
import { socialLinks } from "../../../source/consts";
import { breakpoints } from "../../../source/enums";
import Button from "../../Button";
import Carousel from "../../Carousel";
import Grid from "../../Grid";
import Behance from "../../Icons/Behance";
import Discord from "../../Icons/Discord";
import Facebook from "../../Icons/Facebook";
import Instagram from "../../Icons/Instagram";
import Pinterest from "../../Icons/Pinterest";
import Twitter from "../../Icons/Twitter";
import Youtube from "../../Icons/Youtube";
import Layout from "../../Layout";
import Line from "../../Line";
import Link from "../../Link";
import Nav from "../../Nav";
import { useSize } from "../../SizeProvider";
import Text from "../../Text";

const ModalMenu: FC<
  HTMLAttributes<HTMLElement> & {
    onItemClick?: () => void;
  }
> = ({ onItemClick, ...props }) => {
  const {
    query: { deckId },
  } = useRouter();

  const { decks } = useDecks({
    variables: { withProduct: true },
  });

  const { width = 0, ref } = useResizeDetector<HTMLDivElement>();

  const [currentIndex, setCurrentIndex] = useState(
    (decks && deckId && decks.findIndex(({ slug }) => slug === deckId)) || 0
  );

  useLayoutEffect(() => {
    if (!decks || width === 0 || width >= breakpoints.sm) {
      return;
    }

    const deckIndex = deckId && decks.findIndex(({ slug }) => slug === deckId);

    setCurrentIndex(
      Math.min(
        decks.length - width / 160,
        (deckIndex && deckIndex !== -1 && deckIndex) || 0
      )
    );
  }, [width]);

  const changeIndex = (offset: number) => {
    if (!decks) {
      return;
    }

    const newIndex = currentIndex + offset;

    setCurrentIndex(
      newIndex < 0 ? 0 : Math.min(decks.length - width / 160, newIndex)
    );
  };

  const { width: windowWidth } = useSize();

  return (
    <Layout
      {...props}
      css={(theme) => [
        {
          overflowX: "hidden",
          paddingTop: theme.spacing(15.7),
          paddingBottom: theme.spacing(8.2),
        },
      ]}
    >
      <Grid ref={ref}>
        <div
          css={(theme) => [
            {
              gridColumn: "1 / 5",
              [theme.mq.md]: {
                gridColumn: "1 / 8",
              },
              [theme.maxMQ.sm]: {
                gridColumn: "1 / -1",
              },
            },
          ]}
        >
          {decks &&
            (windowWidth >= breakpoints.sm ? (
              <Grid auto={true} css={{ gridColumn: "span 6" }}>
                <Nav
                  vertical={true}
                  setHover={setCurrentIndex}
                  setModal={onItemClick}
                />
                <div
                  css={(theme) => [
                    {
                      gridColumn: "2 / -1",
                      height: theme.spacing(50),
                      position: "relative",
                    },
                  ]}
                >
                  {decks.map(({ product, slug }, index) =>
                    product ? (
                      <Link
                        key={slug}
                        href={`/${slug}`}
                        {...(onItemClick && {
                          onClick: onItemClick,
                        })}
                        css={(theme) => [
                          {
                            opacity: 0,
                            position: "absolute",
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                            [theme.mq.md]: {
                              backgroundSize: "cover",
                            },
                            backgroundImage: `url(${product.image})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "150%",
                            backgroundPosition: "center",
                            transition: theme.transitions.fast("opacity"),
                          },
                          currentIndex === index && { opacity: 1, zIndex: 1 },
                        ]}
                      />
                    ) : null
                  )}
                </div>
              </Grid>
            ) : (
              <Fragment>
                <Carousel
                  noDots={true}
                  index={currentIndex}
                  onIndexChange={changeIndex}
                  width={160}
                  columnGap={0}
                  css={(theme) => [
                    {
                      height: theme.spacing(23.5),
                      gridColumn: "1/-1",
                    },
                  ]}
                  items={decks.map(({ slug, product }) =>
                    !product ? null : (
                      <Link
                        href={`/${slug}`}
                        key={slug + slug}
                        {...(onItemClick && {
                          onClick: onItemClick,
                        })}
                        css={(theme) => [
                          {
                            width: theme.spacing(16),
                            // backgroundColor: theme.colors.brightGray,
                            backgroundColor: "transparent",
                            // backgroundSize: `${theme.spa cing(40.8)}px 100%`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            borderRadius: theme.spacing(2),
                            flexGrow: 1,
                            flexShrink: 0,
                            display: "inline-block",
                            height: theme.spacing(23.5),
                          },
                        ]}
                        style={{ backgroundImage: `url(${product.image})` }}
                      />
                    )
                  )}
                />
                <Line
                  spacing={1}
                  palette="dark"
                  css={(theme) => [
                    {
                      gridColumn: "1/-1",
                      width: "100%",
                      marginBottom: theme.spacing(3),
                    },
                  ]}
                />
              </Fragment>
            ))}
        </div>

        {windowWidth >= breakpoints.sm && (
          <Line vertical={true} palette="dark" />
        )}
        <div
          css={(theme) => [
            {
              color: theme.colors.text_subtitle_light,
              gridColumn: "span 4/-1",
              [theme.maxMQ.sm]: {
                gridColumn: "1/-1",
                maxWidth: theme.spacing(32),
                margin: "auto",
                [theme.mq.xsm]: {
                  maxWidth: theme.spacing(64),
                  display: "flex",
                  width: "100%",
                },
              },
            },
          ]}
        >
          <Grid
            auto={true}
            css={(theme) => [
              {
                rowGap: theme.spacing(1),
                height: "fit-content",
                flexGrow: 1,
                flexBasis: 0,
              },
              theme.typography.body4,
            ]}
          >
            {[
              { href: "/", text: "Home" },
              { href: "/", text: "Reviews" },
              { href: "/shop", text: "Shop" },
              { href: "/", text: "Tream" },
              { href: "/", text: "Podcast" },
              { href: "/contact", text: "Contact" },
              { href: "/", text: "Gallery" },
            ].map(({ href, text }) => (
              <Link
                key={text}
                href={href}
                css={(theme) => [
                  {
                    gridColumn: "span 3",
                    [theme.mq.sm]: {
                      gridColumn: "span 2",
                      "&:hover": {
                        color: theme.colors.white,
                        transition: theme.transitions.fast("color"),
                      },
                    },
                  },
                ]}
              >
                {text}
              </Link>
            ))}
          </Grid>
          <div
            css={{
              flexGrow: 1,
              flexBasis: 0,
            }}
          >
            {(windowWidth < breakpoints.xsm ||
              windowWidth >= breakpoints.sm) && (
              <Line palette="dark" css={{ width: "100%" }} spacing={4} />
            )}
            <Button color="black">Subscribe to project news</Button>
            <Text variant="body0">
              We will never share your details with others. Unsubscribe at any
              time!
            </Text>
            <Line palette="dark" css={{ width: "100%" }} spacing={4} />
            <div
              css={(theme) => ({
                display: "flex",
                flexWrap: "wrap",
                color: colord(theme.colors.white).alpha(0.2).toRgbString(),
                [theme.maxMQ.sm]: {
                  gap: theme.spacing(1.8),
                },
                [theme.mq.sm]: {
                  gap: theme.spacing(2),
                  gridColumn: "span 4",
                },
              })}
            >
              {[
                {
                  Icon: Twitter,
                  href: socialLinks.twitter,
                },
                {
                  Icon: Instagram,
                  href: socialLinks.instagram,
                },
                {
                  Icon: Facebook,
                  href: socialLinks.facebook,
                },
                {
                  Icon: Behance,
                  href: socialLinks.behance,
                },
                {
                  Icon: Youtube,
                  href: socialLinks.youtube,
                },
                {
                  Icon: Pinterest,
                  href: socialLinks.pinterest,
                },
                {
                  Icon: Discord,
                  href: socialLinks.discord,
                },
              ].map(({ Icon, href }) => (
                <Button
                  css={(theme) => ({
                    width: theme.spacing(3) + "px !important",
                    height: theme.spacing(3) + "px !important",
                  })}
                  key={href}
                  component={Link}
                  target="_blank"
                  href={href}
                  Icon={Icon}
                />
              ))}
            </div>
          </div>
        </div>
      </Grid>
    </Layout>
  );
};

export default ModalMenu;
