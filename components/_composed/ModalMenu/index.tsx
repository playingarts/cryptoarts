import { Dispatch, FC, HTMLAttributes, SetStateAction, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import { useDecks } from "../../../hooks/deck";
import Carousel from "../../Carousel";
import Footer from "../../Footer";
import Grid from "../../Grid";
import Layout from "../../Layout";
import Line from "../../Line";
import Link from "../../Link";

const ModalMenu: FC<
  HTMLAttributes<HTMLElement> & { onClick?: Dispatch<SetStateAction<boolean>> }
> = ({ onClick, ...props }) => {
  const { decks } = useDecks({
    variables: { withProduct: true },
  });

  const { width = 0, ref } = useResizeDetector<HTMLDivElement>();

  const [currentIndex, setCurrentIndex] = useState(0);

  const changeIndex = (offset: number) => {
    if (!decks) {
      return;
    }

    const newIndex = currentIndex + offset;

    setCurrentIndex(
      newIndex < 0 ? 0 : Math.min(decks.length - width / 160, newIndex)
    );
  };

  return (
    <Layout
      {...props}
      css={[
        {
          overflow: "hidden",
        },
      ]}
    >
      <Grid ref={ref}>
        {decks && (
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
                  onClick={onClick}
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
        )}
        <Line
          spacing={1}
          palette={"dark"}
          css={[
            {
              gridColumn: "1/-1",
              width: "100%",
            },
          ]}
        />

        <Footer
          noTop={true}
          noStore={true}
          palette="dark"
          css={(theme) => [
            { gridColumn: "1/-1", marginTop: theme.spacing(2.5) },
          ]}
        />
      </Grid>
    </Layout>
  );
};

export default ModalMenu;
