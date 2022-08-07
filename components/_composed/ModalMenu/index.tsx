import { useRouter } from "next/router";
import { FC, Fragment, HTMLAttributes, useLayoutEffect, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import { useDecks } from "../../../hooks/deck";
import { breakpoints } from "../../../source/enums";
import Carousel from "../../Carousel";
import Footer from "../../Footer";
import Grid from "../../Grid";
import Layout from "../../Layout";
import Line from "../../Line";
import Link from "../../Link";
import Nav from "../../Nav";
import { useSize } from "../../SizeProvider";

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
    <Layout {...props} css={[{ overflow: "hidden" }]}>
      <Grid ref={ref}>
        <Footer
          reverseMobile={true}
          noStore={windowWidth < breakpoints.sm}
          palette="dark"
          css={(theme) => [
            {
              [theme.mq.sm]: {
                paddingTop: theme.spacing(12),
                paddingBottom: theme.spacing(5),
              },

              gridColumn: "1/-1",
            },
          ]}
        >
          {decks &&
            (windowWidth >= breakpoints.sm ? (
              <Grid auto={true}>
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
                      <div
                        key={slug}
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
                          currentIndex === index && { opacity: 1 },
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
                  palette={"dark"}
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
        </Footer>
      </Grid>
    </Layout>
  );
};

export default ModalMenu;
