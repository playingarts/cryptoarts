import { FC, HTMLAttributes, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import { useDecks } from "../../../hooks/deck";
import { breakpoints } from "../../../source/enums";
import Carousel from "../../Carousel";
import Grid from "../../Grid";
import Link from "../../Link";

const visibleItems = 1;

const BrowseCollection: FC<HTMLAttributes<HTMLElement>> = (props) => {
  const { decks, loading } = useDecks({ variables: { withProduct: true } });

  const { width = 0, ref } = useResizeDetector<HTMLDivElement>();

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
        (window.innerWidth < breakpoints.sm ? (
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
              items={decks.map(({ slug, product }) =>
                !product ? null : (
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
                )
              )}
            />
          </div>
        ) : (
          <Grid
            {...props}
            css={(theme) => ({
              gap: theme.spacing(3),
              gridColumn: "1 / -1",
            })}
            shop={true}
          >
            {decks.map(({ slug, product }) =>
              !product ? null : (
                <Link
                  href={`/${slug}`}
                  key={slug}
                  css={(theme) => ({
                    aspectRatio: "1",
                    gridColumn: "span 4",
                    borderRadius: theme.spacing(2),
                    backgroundSize: "cover",
                    backgroundPosition: "50% 50%",
                    backgroundColor: theme.colors.page_bg_light_gray,
                    transition: theme.transitions.fast("background-color"),
                    "&:hover": {
                      backgroundColor: theme.colors.white,
                    },
                  })}
                  style={{ backgroundImage: `url(${product.image})` }}
                />
              )
            )}
          </Grid>
        ))}
    </Grid>
  );
};

export default BrowseCollection;
