import { FC, useMemo, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { keyframes } from "@emotion/react";
import Star from "../Icons/Star";
import { useFavorites } from "../Contexts/favorites";
import { useFlyingFav } from "../Contexts/flyingFav";

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  25% { transform: scale(1.3); }
  50% { transform: scale(1.1); }
  75% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const FloatingFavButton: FC = () => {
  const router = useRouter();
  const { favorites } = useFavorites();
  const { onFlyComplete } = useFlyingFav();
  const [isAnimating, setIsAnimating] = useState(false);

  // Count total valid favorite cards across all decks
  const totalFavorites = useMemo(() => {
    if (!favorites) return 0;
    return Object.values(favorites).reduce((sum, ids) => {
      const validIds = ids.filter((id) => id && id.trim() !== "");
      return sum + validIds.length;
    }, 0);
  }, [favorites]);

  // Register callback for when flying star animation completes
  useEffect(() => {
    onFlyComplete(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 400);
    });
  }, [onFlyComplete]);

  // Hide on favorites page, bag page, or if no favorites
  if (router.pathname === "/favorites" || router.pathname === "/bag" || totalFavorites === 0) {
    return null;
  }

  return (
    <Link
      href="/favorites"
      css={(theme) => ({
        position: "fixed",
        right: 30,
        bottom: 30,
        width: 60,
        height: 60,
        borderRadius: "50%",
        backgroundColor: theme.colors.accent,
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999,
        boxShadow: "0 4px 20px rgba(106, 90, 205, 0.4)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 6px 30px rgba(106, 90, 205, 0.5)",
        },
        "&:active": {
          transform: "scale(0.98)",
        },
        ...(isAnimating && {
          animation: `${pulseAnimation} 0.4s ease-out`,
        }),
      })}
      aria-label="Favorites"
    >
      <Star
        css={{
          width: 30,
          height: 30,
          color: "white",
        }}
      />
    </Link>
  );
};

export default FloatingFavButton;
