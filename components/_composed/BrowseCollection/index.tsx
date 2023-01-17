import { FC, HTMLAttributes, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import { useDecks } from "../../../hooks/deck";
import { breakpoints } from "../../../source/enums";
import Button from "../../Button";
import Carousel from "../../Carousel";
import Grid from "../../Grid";
import Link from "../../Link";

const visibleItems = 1;

const BrowseCollection: FC<HTMLAttributes<HTMLElement>> = (props) => {
  const { decks, loading } = useDecks({ variables: { withProduct: true } });

  const { width = 0, ref } = useResizeDetector<HTMLDivElement>();

  const [isCarousel, setIsCarousel] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);

  const changeIndex = (offset: number) => {
    if (!decks) {
      return;
    }

    const newIndex = currentIndex + offset;

    setCurrentIndex(
      newIndex < 0 ? 0 : Math.min(decks.length - visibleItems, newIndex)
    );
  };

  return (
    <Grid ref={ref}>
      {!loading &&
        decks &&
        (isCarousel && window.innerWidth < breakpoints.sm ? (
          <div
            css={[
              {
                gridColumn: "1/-1",
              },
            ]}
          >
            <Carousel
              index={currentIndex}
              onIndexChange={changeIndex}
              width={width}
              css={(theme) => [
                {
                  gap: theme.spacing(1),
                },
              ]}
              items={decks.map(({ slug, title, product }) =>
                !product ? null : (
                  <div>
                    <Link
                      href={`/${slug}`}
                      key={slug + slug}
                      css={(theme) => [
                        {
                          width: width,
                          backgroundColor: theme.colors.brightGray,
                          backgroundSize: `${theme.spacing(40.8)}px 100%`,
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          borderRadius: theme.spacing(2),
                          flexGrow: 1,
                          flexShrink: 0,
                          display: "inline-block",
                          height: theme.spacing(34),
                        },
                      ]}
                      style={{ backgroundImage: `url(${product.image})` }}
                    />
                    <Button
                      href={`/${slug}`}
                      component={Link}
                      css={(theme) => [
                        {
                          width: "100%",
                          marginTop: theme.spacing(1),
                          marginBottom: theme.spacing(1),
                          color: theme.colors.white,
                          backgroundColor: theme.colors.black,
                          justifyContent: "center",
                        },
                      ]}
                    >
                      VIEW {title}
                    </Button>
                  </div>
                )
              )}
            />
          </div>
        ) : (
          <Grid
            {...props}
            css={(theme) => ({
              gap: theme.spacing(3),
              [theme.maxMQ.sm]: {
                gap: theme.spacing(1),
                marginTop: 0,
              },
              gridColumn: "1 / -1",
            })}
            shop={true}
          >
            {decks.map(({ slug, product }, index) =>
              !product ? null : (
                <Link
                  href={`/${slug}`}
                  key={slug}
                  css={(theme) => ({
                    aspectRatio: "1",
                    gridColumn: "span 4",
                    borderRadius: theme.spacing(2),
                    [theme.maxMQ.sm]: [
                      index === decks.length - 1
                        ? {
                            gridColumn: "1/-1",
                            height: theme.spacing(34),
                            width: "100%",
                          }
                        : {
                            height: theme.spacing(16),
                            width: "100%",
                            borderRadius: theme.spacing(1),
                            gridColumn: "span 2",
                          },
                    ],
                    [theme.maxMQ.xsm]: [
                      index !== decks.length - 1 && {
                        height: theme.spacing(16),
                        width: "100%",
                        borderRadius: theme.spacing(1),
                        gridColumn: "span 3",
                      },
                    ],
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "50% 50%",
                    backgroundColor: theme.colors.page_bg_light_gray,
                    transition: theme.transitions.fast("background-color"),
                    [theme.mq.sm]: {
                      "&:hover": {
                        backgroundColor: theme.colors.white,
                      },
                    },
                  })}
                  style={{ backgroundImage: `url(${product.image})` }}
                />
              )
            )}
          </Grid>
        ))}
      {isCarousel && width > 100000 && (
        <Button
          onClick={() => setIsCarousel(false)}
          css={(theme) => [
            {
              marginTop: theme.spacing(2.5),
              gridColumn: "1/-1",
              color: theme.colors.white,
              background: theme.colors.black,
              justifyContent: "center",
            },
          ]}
        >
          ALL EDITIONS
        </Button>
      )}
    </Grid>
  );
};

export default BrowseCollection;
