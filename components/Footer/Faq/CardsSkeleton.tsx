import { FC } from "react";
import {
  CARD_WIDTH,
  CARD_HEIGHT,
  CARD_BORDER_RADIUS,
  BACKSIDE_ROTATION,
  FRONT_ROTATION,
} from "./constants";

const CardsSkeleton: FC = () => (
  <>
    {/* Backside skeleton */}
    <div
      css={(theme) => ({
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: CARD_BORDER_RADIUS,
        background: theme.colors.pale_gray,
        position: "absolute",
        transform: "translate(-50%,-70%)",
        top: 0,
        left: 0,
        rotate: BACKSIDE_ROTATION,
        transformOrigin: "bottom left",
        zIndex: 1,
      })}
    />
    {/* Front skeleton */}
    <div
      css={(theme) => ({
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: CARD_BORDER_RADIUS,
        background: theme.colors.pale_gray,
        backgroundImage: `linear-gradient(90deg, ${theme.colors.pale_gray} 0%, ${theme.colors.soft_gray} 50%, ${theme.colors.pale_gray} 100%)`,
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s ease-in-out infinite",
        "@keyframes shimmer": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        position: "absolute",
        transform: "translate(-50%,-70%)",
        top: 0,
        left: 0,
        rotate: FRONT_ROTATION,
        transformOrigin: "left",
        zIndex: 2,
      })}
    />
  </>
);

export default CardsSkeleton;
