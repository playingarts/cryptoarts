import { FC, HTMLAttributes } from "react";

// Layout constants
const GRID_COLUMNS = 12;
const COLUMN_WIDTH_UNITS = 8; // theme.spacing units
const GAP_UNITS = 3; // theme.spacing units
const HEADER_HEIGHT_NORMAL = 68;
const HEADER_HEIGHT_SCROLLED = 58;

/**
 * Grid layout for MainMenu sections
 * Provides consistent column layout with light background
 */
const MenuGrid: FC<HTMLAttributes<HTMLElement> & { isHeader?: boolean; scrolledPast600?: boolean }> = ({
  children,
  isHeader,
  scrolledPast600 = false,
  ...props
}) => {
  const headerHeight = scrolledPast600 ? HEADER_HEIGHT_SCROLLED : HEADER_HEIGHT_NORMAL;

  return (
    <div
      css={(theme) => [
        {
          paddingTop: isHeader && scrolledPast600 ? 0 : 10,
          // Set CSS variable for header height
          "--menu-header-height": `${headerHeight}px`,
          "--menu-header-line-height": `${headerHeight}px`,
          display: "grid",
          background: theme.colors.pale_gray,
          columnGap: theme.spacing(3),
          "--columnWidth": `${theme.spacing(8)}px`,
          gridTemplateColumns: "repeat(6, var(--columnWidth))",
          width: "fit-content",
          // Padding to align content with 12-column grid, extends to screen edges
          paddingLeft: `max(${theme.spacing(GAP_UNITS)}px, calc((100vw - ${GRID_COLUMNS * theme.spacing(COLUMN_WIDTH_UNITS) + (GRID_COLUMNS - 1) * theme.spacing(GAP_UNITS)}px) / 2))`,
          paddingRight: 60,
          [theme.maxMQ.xsm]: {
            width: "100%",
            gridTemplateColumns: "1fr",
            paddingTop: 0,
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
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
