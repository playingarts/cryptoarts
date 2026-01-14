import { colord } from "colord";
import { FC, HTMLAttributes, memo, ReactNode, useEffect, useState } from "react";
import Grid from "../Grid";
import ScandiBlock from "../ScandiBlock";
import CTA from "./CTA";
import Middle, { PageNav } from "./Middle";
import TitleButton from "./TitleButton";
import { usePalette } from "../Pages/Deck/DeckPaletteContext";
import { useSize } from "../SizeProvider";
import { breakpoints } from "../../source/enums";
import { useProducts } from "../../hooks/product";

export interface Props extends HTMLAttributes<HTMLElement> {
  customCTA?: ReactNode;
  customMiddle?: ReactNode;
  links?: string[];
}

const Header: FC<Props> = ({
  customMiddle,
  customCTA,
  links = ["About", "Collection", "Gallery", "AR", "Reviews", "Podcast"],
  ...props
}) => {
  const [showSiteNav, setShowSiteNav] = useState<"top" | "afterTop">("top");

  const [altNav, setAltNav] = useState(false);

  const { palette } = usePalette();

  const { width } = useSize();
  const [hover, setHover] = useState(false);

  // Prefetch products data so it's ready when menu opens
  useProducts();

  useEffect(() => {
    let lastScrollTop = 0;

    const handler = () => {
      const scrollTop = window.scrollY;

      // Always update showSiteNav based on scroll position
      if (scrollTop >= 500) {
        setShowSiteNav("afterTop");
      } else {
        setShowSiteNav("top");
      }

      // Only update altNav direction when not hovering
      if (!hover) {
        setAltNav(scrollTop <= lastScrollTop ? false : true);
        lastScrollTop = scrollTop;
      }
    };

    window.addEventListener("scroll", handler);

    // Check scroll position immediately when hover changes
    handler();

    return () => window.removeEventListener("scroll", handler);
  }, [setShowSiteNav, hover]);

  return (
    <header
      {...props}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      css={(theme) => [
        {
          zIndex: 9999,
          width: "100%",
          marginTop: -75,
          transition: theme.transitions.fast("all"),
          position: "sticky",
          transform: "translateY(100%) translateY(15px)",
        },
      ]}
      style={
        width >= breakpoints.sm
          ? showSiteNav === "top"
            ? {
                top: -155,
              }
            : {
                top: -76,
                marginTop: -60,
              }
          : {
              top: -75,
            }
      }
    >
      <Grid
        css={(theme) => [
          {
            gridTemplateRows: 60,
            lineHeight: "60px",
            alignItems: "center",
            zIndex: 1,
            overflow: "hidden",
            color:
              palette === "dark"
                ? theme.colors.white75
                : theme.colors.dark_gray,
            background: "#FFFFFF00",
            transition: theme.transitions.fast([
              "background",
              "line-height",
              "grid-template-rows",
              "color",
            ]),
            [theme.maxMQ.sm]: {
              // Mobile styles - to be implemented
            },
          },
        ]}
        style={
          showSiteNav === "top" && width >= breakpoints.sm
            ? {
                gridTemplateRows: 70,
                lineHeight: "70px",
              }
            : {
                background:
                  palette === "dark"
                    ? "#292929"
                    : colord("#FFFFFF").alpha(0.9).toRgbString(),
                backdropFilter: "blur(10px)",
              }
        }
      >
        <TitleButton
          inset={showSiteNav !== "afterTop"}
          showSiteNav={showSiteNav}
          css={(theme) => [
            {
              transition: theme.transitions.fast(["border-color", "top"]),
              top: 0,
              [theme.mq.sm]: {
                [theme.maxMQ.md]: [
                  showSiteNav !== "top" &&
                    altNav && {
                      top: "-100%",
                    },
                ],
              },
            },
          ]}
          style={
            ((showSiteNav === "afterTop" || width < breakpoints.sm) && {
              boxShadow: "none",
            }) ||
            {}
          }
        />
        <Middle
          {...{ showSiteNav, altNav }}
          customMiddle={customMiddle}
          links={links}
        />

        <ScandiBlock
          palette={palette}
          css={(theme) => [
            {
              [theme.mq.sm]: {
                gridColumn: "span 3",
              },
              justifyContent: "space-between",
              height: "100%",
              transition: theme.transitions.fast("border-color"),
              padding: 0,
            },
          ]}
          inset={showSiteNav !== "afterTop" && true}
          style={
            ((showSiteNav === "afterTop" || width < breakpoints.sm) && {
              boxShadow: "none",
            }) ||
            {}
          }
        >
          {customCTA ?? <CTA />}
        </ScandiBlock>
      </Grid>
    </header>
  );
};

// Memoize Header to prevent re-renders during carousel rotation
export default memo(Header);
