import { FC, HTMLAttributes, useRef, useState } from "react";
import Intro from "../../../Intro";
import Button from "../../../Buttons/Button";
import NavButton from "../../../Buttons/NavButton";
import { useProducts } from "../../../../hooks/product";
import Grid from "../../../Grid";
import CollectionItem from "../../Shop/Collection/CollectionItem";

const Collection: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const { products } = useProducts();

  const ref = useRef<HTMLDivElement>(null);

  return (
    <Grid
      css={(theme) => [
        {
          background: theme.colors.pale_gray,
          paddingTop: 60,
          paddingBottom: 60,
        },
      ]}
    >
      <Intro
        css={[
          {
            gridColumn: "1/-1",
          },
        ]}
        arrowedText="Complete your collection"
        paragraphText="Loved this deck? Continue the story 
with these collector’s favourites."
        beforeLinkNew={<Button bordered>View all products</Button>}
        bottom={
          <div css={[{ display: "flex", gap: 5, marginTop: 120 }]}>
            <NavButton
              css={[
                {
                  background: "white",
                  rotate: "180deg",
                },
              ]}
              onClick={() => {
                ref.current &&
                  ref.current.scrollBy({
                    behavior: "smooth",
                    left: -1293,
                  });
              }}
            />
            <NavButton
              css={[
                {
                  background: "white",
                },
              ]}
              onClick={() => {
                ref.current &&
                  ref.current.scrollBy({
                    behavior: "smooth",
                    left: 1293,
                  });
              }}
            />
          </div>
        }
      />
      <div
        css={[
          {
            gridColumn: "1/-1",
            overflow: "scroll",
            marginTop: 60,
            "&::-webkit-scrollbar": {
              display: "none",
            },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          },
        ]}
        ref={ref}
      >
        <div
          css={[
            {
              display: "inline-flex",
              width: "fit-content",

              "> *:not(:first-of-type)": {
                marginLeft: 3,
              },
            },
          ]}
        >
          {products &&
            products.map((product) => (
              <CollectionItem
                key={product._id + "collection"}
                css={(theme) => [
                  {
                    display: "inline-block",
                    background: theme.colors.soft_gray,
                    borderRadius: 20,
                    width: 428,
                    "&:hover": {
                      background: theme.colors.white75,
                    },
                  },
                ]}
                product={product}
              />
            ))}
        </div>
      </div>
    </Grid>
  );
};

export default Collection;
