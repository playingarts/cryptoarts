import { FC, useMemo, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { keyframes } from "@emotion/react";
import Star from "../Icons/Star";
import { useFavorites } from "../Contexts/favorites";
import { useFlyingFav } from "../Contexts/flyingFav";

const bounceAnimation = keyframes`
  0% { transform: translateY(0) scaleX(1) scaleY(1); }
  10% { transform: translateY(2px) scaleX(1.1) scaleY(0.9); }
  30% { transform: translateY(-16px) scaleX(0.9) scaleY(1.1); }
  50% { transform: translateY(0) scaleX(1.05) scaleY(0.95); }
  60% { transform: translateY(-8px) scaleX(0.95) scaleY(1.05); }
  75% { transform: translateY(0) scaleX(1.02) scaleY(0.98); }
  85% { transform: translateY(-3px) scaleX(0.98) scaleY(1.02); }
  100% { transform: translateY(0) scaleX(1) scaleY(1); }
`;

const FloatingFavButton: FC = () => {
  const router = useRouter();
  const { favorites } = useFavorites();
  const { onFlyComplete, isPopupOpen } = useFlyingFav();
  const [isBouncing, setIsBouncing] = useState(false);

  // Count total valid favorite cards across all decks
  const totalFavorites = useMemo(() => {
    if (!favorites) return 0;
    return Object.values(favorites).reduce((sum, ids) => {
      const validIds = ids.filter((id) => id && id.trim() !== "");
      return sum + validIds.length;
    }, 0);
  }, [favorites]);

  // Register callback for when flying star animation completes - use bounce effect
  useEffect(() => {
    onFlyComplete(() => {
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 600);
    });
  }, [onFlyComplete]);

  // Periodic bounce animation every 30 seconds
  useEffect(() => {
    if (totalFavorites === 0) return;

    const interval = setInterval(() => {
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 600);
    }, 30000);

    return () => clearInterval(interval);
  }, [totalFavorites]);

  // Hide on favorites page, bag page, or if no favorites
  if (router.pathname === "/favorites" || router.pathname === "/bag" || totalFavorites === 0) {
    return null;
  }

  return (
    <Link
      href="/favorites"
      css={(theme) => ({
        position: "fixed",
        right: 15,
        bottom: 15,
        width: 60,
        height: 60,
        borderRadius: "50%",
        backgroundColor: isPopupOpen ? theme.colors.white : theme.colors.accent,
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999,
        boxShadow: isPopupOpen
          ? "0 4px 20px rgba(0, 0, 0, 0.2)"
          : "0 4px 20px rgba(106, 90, 205, 0.4)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: isPopupOpen
            ? "0 6px 30px rgba(0, 0, 0, 0.3)"
            : "0 6px 30px rgba(106, 90, 205, 0.5)",
        },
        "&:active": {
          transform: "scale(0.98)",
        },
        ...(isBouncing && {
          animation: `${bounceAnimation} 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
        }),
      })}
      aria-label="Favorites"
    >
      <Star
        css={(theme) => ({
          width: 30,
          height: 30,
          color: isPopupOpen ? theme.colors.accent : "white",
        })}
      />
    </Link>
  );
};

export default FloatingFavButton;
