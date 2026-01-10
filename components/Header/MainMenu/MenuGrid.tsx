import { FC, HTMLAttributes, useEffect, useState } from "react";
import { usePalette } from "../../Pages/Deck/DeckPaletteContext";

/**
 * Grid layout for MainMenu sections
 * Provides consistent column layout with palette-aware background
 */
const MenuGrid: FC<HTMLAttributes<HTMLElement> & { isHeader?: boolean }> = ({
  children,
  isHeader,
  ...props
}) => {
  const { palette } = usePalette();
  const [scrolledPast600, setScrolledPast600] = useState(false);

  useEffect(() => {
    // Check initial scroll position
    setScrolledPast600(window.scrollY >= 600);

    const handler = () => {
      setScrolledPast600(window.scrollY >= 600);
    };

    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Calculate padding to align content with 12-column grid
  // 12-column grid width = 12 * 80px + 11 * 30px (gaps) = 960 + 330 = 1290px
  // Left padding = (viewport - 1290) / 2 to align with grid start

  const headerHeight = scrolledPast600 ? 58 : 68;

  return (
    <div
      css={(theme) => [
        {
          paddingTop: isHeader && scrolledPast600 ? 0 : 11,
          // Set CSS variable for header height
          "--menu-header-height": `${headerHeight}px`,
          "--menu-header-line-height": `${headerHeight}px`,
          display: "grid",
          background: theme.colors[palette === "dark" ? "black" : "pale_gray"],
          columnGap: theme.spacing(3),
          "--columnWidth": `${theme.spacing(8)}px`,
          gridTemplateColumns: "repeat(6, var(--columnWidth))",
          width: "fit-content",
          // Padding to align content with 12-column grid, extends to screen edges
          paddingLeft: `max(${theme.spacing(3)}px, calc((100vw - ${12 * theme.spacing(8) + 11 * theme.spacing(3)}px) / 2))`,
          paddingRight: theme.spacing(3),
          [theme.maxMQ.sm]: {
            // Mobile styles - to be implemented
          },
        },
      ]}
      {...props}
    >
      {children}
    </div>
  );
};

export default MenuGrid;
