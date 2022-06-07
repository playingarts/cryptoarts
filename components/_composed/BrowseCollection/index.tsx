import { FC, HTMLAttributes } from "react";
import { useDecks } from "../../../hooks/deck";
import Grid from "../../Grid";
import Link from "../../Link";

const BrowseCollection: FC<HTMLAttributes<HTMLElement>> = (props) => {
  const { decks, loading } = useDecks({ variables: { withProduct: true } });

  if (loading || !decks) {
    return null;
  }

  return (
    <Grid>
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
    </Grid>
  );
};

export default BrowseCollection;
