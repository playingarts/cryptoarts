import { FC, HTMLAttributes } from "react";
import { usePalette } from "../../Pages/Deck/DeckPaletteContext";

/**
 * Grid layout for MainMenu sections
 * Provides consistent column layout with palette-aware background
 */
const MenuGrid: FC<HTMLAttributes<HTMLElement>> = ({ children, ...props }) => {
  const { palette } = usePalette();

  return (
    <div
      css={(theme) => [
        {
          paddingTop: 15,
          display: "grid",
          background: theme.colors[palette === "dark" ? "black" : "pale_gray"],
          columnGap: theme.spacing(3),
          "--columnWidth": `${theme.spacing(8)}px`,
          [theme.maxMQ.sm]: {
            // Mobile styles - to be implemented
          },
          paddingLeft: 75,
          paddingRight: 75,
          gridTemplateColumns: "repeat(6, var(--columnWidth))",
          width: "fit-content",
        },
      ]}
      {...props}
    >
      {children}
    </div>
  );
};

export default MenuGrid;
