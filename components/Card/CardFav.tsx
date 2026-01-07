import { FC, HTMLAttributes, memo, useEffect, useState } from "react";
import Star from "../Icons/Star";
import Label from "../Label";
import { useFavorites } from "../Contexts/favorites";
import { cardSizes, CardSize } from "./sizes";

export interface CardFavProps extends HTMLAttributes<HTMLElement> {
  size: CardSize;
  deckSlug?: string;
  id: string;
  noFav?: boolean;
}

/**
 * Favorites button overlay for Card component
 * Shows star icon and "Add to Favorites" / "Favorited" label on hover
 */
const CardFav: FC<CardFavProps> = memo(
  ({ noFav, deckSlug, id, size, ...props }) => {
    const [hover, setHover] = useState(false);
    const { addItem, isFavorite, removeItem } = useFavorites();
    const [favoriteState, setFavoriteState] = useState(false);

    useEffect(() => {
      deckSlug && setFavoriteState(isFavorite(deckSlug, id));
    }, [isFavorite, deckSlug, id]);

    return (
      <>
        <div
          css={(theme) => [
            {
              transition: theme.transitions.fast("box-shadow"),
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: cardSizes[size].width,
              boxShadow: favoriteState
                ? "0px 4px 20px 0px #6A5ACD80"
                : "0px 5px 20px 0px rgba(0, 0, 0, 0.20)",
              borderRadius: size === "nano" ? 10 : 15,
              aspectRatio: "0.7076923076923077",
              zIndex: 0,
            },
          ]}
        />
        {noFav ? null : (
          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={(e) => {
              e.stopPropagation();
              if (deckSlug) {
                if (favoriteState) {
                  removeItem(deckSlug, id);
                } else {
                  addItem(deckSlug, id);
                }
              }
            }}
            css={(theme) => [
              {
                zIndex: 1,
                position: "absolute",
                right: 0,
                top: 0,
                width: 46,
                height: 46,
                background:
                  theme.colors[favoriteState === true ? "pale_gray" : "accent"],
                color:
                  theme.colors[favoriteState === true ? "accent" : "soft_gray"],
                borderRadius: "0 15px 0 100px",
              },
            ]}
            {...props}
          >
            <Star
              css={() => [
                {
                  marginTop: 6,
                  marginLeft: 13,
                },
              ]}
            />
            <Label
              css={(theme) => [
                {
                  color: theme.colors[favoriteState ? "black" : "white"],
                  background: theme.colors[favoriteState ? "mint" : "black"],
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  top: 0,
                  right: 0,
                  transform: "translate(50%, -100%)",
                  position: "absolute",
                  textTransform: "initial",

                  opacity: 1,
                  "@keyframes FavFadeIn": {
                    "0%": {
                      opacity: 0,
                      transform: "translate(50%, -100%)",
                    },
                    "100%": {
                      opacity: 1,
                      transform: "translate(50%, calc(-100% - 10px))",
                    },
                  },
                  "@keyframes FavFadeOut": {
                    "100%": {
                      opacity: 0,
                      transform: "translate(50%, -100%)",
                    },
                    "0%": {
                      opacity: 1,
                      transform: "translate(50%, calc(-100% - 10px))",
                    },
                  },
                  animation: `${
                    hover ? "FavFadeIn" : "FavFadeOut"
                  } 100ms forwards linear`,
                },
              ]}
            >
              {favoriteState ? "Favorited" : "Add to Favorites"}
            </Label>
          </div>
        )}
      </>
    );
  }
);

CardFav.displayName = "CardFav";

export default CardFav;
