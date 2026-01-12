import { FC, forwardRef, HTMLAttributes } from "react";
import { usePalette } from "../../DeckPaletteContext";

// Card position constants
const CARD_POSITIONS = {
  left: { left: 95, rotate: "-10deg", zIndex: 2 },
  right: { left: 275, rotate: "10deg", zIndex: 1 },
} as const;

const CARD_TOP = -38;

const CardPlaceholder: FC<{ left: number; rotate: string; zIndex: number; palette: "dark" | "light" }> = ({
  left,
  rotate,
  zIndex,
  palette
}) => (
  <div
    css={(theme) => ({
      width: 330,
      height: 464,
      position: "absolute",
      top: CARD_TOP,
      borderRadius: 15,
      left,
      rotate,
      zIndex,
      transformOrigin: "bottom center",
      background: palette === "dark" ? theme.colors.black : theme.colors.white,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    })}
  />
);

interface HeroCardsProps extends HTMLAttributes<HTMLElement> {
  sticky?: boolean;
}

const HeroCards = forwardRef<HTMLDivElement, HeroCardsProps>(({ sticky = true, ...props }, ref) => {
  const { palette } = usePalette();

  return (
    <div
      ref={ref}
      css={[
        {
          gridColumn: "span 6",
          alignSelf: "start",
          marginBottom: 90,
          top: 100,
          willChange: "transform",
        },
        sticky && {
          position: "sticky",
        },
      ]}
      {...props}
    >
      <CardPlaceholder
        left={CARD_POSITIONS.right.left}
        rotate={CARD_POSITIONS.right.rotate}
        zIndex={CARD_POSITIONS.right.zIndex}
        palette={palette}
      />
      <CardPlaceholder
        left={CARD_POSITIONS.left.left}
        rotate={CARD_POSITIONS.left.rotate}
        zIndex={CARD_POSITIONS.left.zIndex}
        palette={palette}
      />
    </div>
  );
});

HeroCards.displayName = "HeroCards";

export default HeroCards;
