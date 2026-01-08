import Link from "../../Link";
import Logo from "../../Icons/Logo";
import Button from "../../Buttons/Button";
import ArrowNav from "./ArrowNav";
import { usePalette } from "../../Pages/Deck/DeckPaletteContext";
import { FC, HTMLAttributes, ReactNode, useContext } from "react";
import { useSize } from "../../SizeProvider";
import { breakpoints } from "../../../source/enums";
import { createContext } from "react";

// Safe hook that doesn't throw if context is missing
const useHeroCarouselSafe = () => {
  try {
    // Dynamic import to avoid circular dependency
    const { useHeroCarousel } = require("../../../contexts/heroCarouselContext");
    return useHeroCarousel();
  } catch {
    return null;
  }
};

export const PageNav: FC<HTMLAttributes<HTMLElement> & { links: string[] }> = ({
  links,
  ...props
}) => {
  const { palette } = usePalette();
  return (
    <div
      {...props}
      css={[
        {
          height: "50%",
          gap: 10,
          display: "flex",
        },
      ]}
    >
      {links &&
        links.map((name, i) => (
          <Link
            href={"#" + name.toLowerCase()}
            key={name + i}
            css={(theme) => [
              {
                display: "flex",
                alignItems: "center",
              },
            ]}
          >
            <Button
              noColor={true}
              size="small"
              css={(theme) => [
                {
                  color: theme.colors[palette === "dark" ? "white" : "black"],
                },
              ]}
            >
              {name}
            </Button>
          </Link>
        ))}
    </div>
  );
};

const Middle = ({
  showSiteNav,
  altNav,
  customMiddle,
  links,
}: {
  customMiddle: ReactNode;
  showSiteNav: "top" | "afterTop";
  altNav: boolean;
  links: string[];
}) => {
  const { palette } = usePalette();
  const { width } = useSize();
  const carouselState = useHeroCarouselSafe();
  const progress = carouselState?.progress ?? 0;
  const isPaused = carouselState?.isPaused ?? false;

  return (
    <div
      css={(theme) => ({
        transition: theme.transitions.normal("top"),
        flexGrow: 1,
        position: "relative",
        height: "100%",
        [theme.mq.sm]: {
          gridColumn: "span 3",
        },
        [theme.mq.md]: {
          gridColumn: "span 6",
        },
      })}
    >
      {/* Background line */}
      <div
        css={(theme) => [
          {
            boxSizing: "content-box",
            borderTop:
              "1px solid " +
              (palette === "dark" ? theme.colors.white30 : "rgba(0,0,0,0.2)"),
            position: "absolute",
            width: "100%",
            top: 0,
            left: 0,
            transition: theme.transitions.slow(["border-color"]),
          },
        ]}
        style={{
          ...(((showSiteNav === "afterTop" || width < breakpoints.sm) && {
            borderColor: "transparent",
          }) ||
            {}),
        }}
      />
      {/* Progress line overlay */}
      {carouselState && (
        <div
          css={(theme) => [
            {
              position: "absolute",
              height: 1,
              top: 0,
              left: 0,
              background: palette === "dark" ? theme.colors.white : "black",
              transition: isPaused ? "none" : "width 100ms linear",
            },
          ]}
          style={{
            width: `${progress * 100}%`,
            ...(((showSiteNav === "afterTop" || width < breakpoints.sm) && {
              opacity: 0,
            }) ||
              {}),
          }}
        />
      )}
      <div
        {...(!customMiddle
          ? {
              css: (theme) => [
                {
                  color: theme.colors.dark_gray,
                  height: "200%",
                  position: "relative",
                  top: 0,
                  transition: theme.transitions.fast("top"),
                },
              ],
              style:
                (width >= breakpoints.sm &&
                  showSiteNav !== "top" &&
                  altNav && {
                    top: "-100%",
                  }) ||
                {},
            }
          : {})}
      >
        <div
          css={(theme) => [
            {
              height: "50%",
              display: "flex",
              "> *": {
                flexGrow: 1,
              },
            },
            palette === "dark" && {
              color: theme.colors.white75,
            },
          ]}
        >
          <Link
            href={(process.env.NEXT_PUBLIC_BASELINK || "") + "/"}
            css={(theme) => [
              {
                display: "inline-block",
                height: "100%",
                [theme.maxMQ.sm]: {
                  textAlign: "center",
                },

                // width: "100%",
                [theme.mq.sm]: {
                  "&:hover": {
                    opacity: 0.5,
                  },
                  transition: theme.transitions.fast("opacity"),
                },
              },
            ]}
          >
            <Logo
              css={[
                {
                  verticalAlign: "middle",
                },
              ]}
            />
          </Link>
          {customMiddle ?? <ArrowNav />}
        </div>
        {!customMiddle && width >= breakpoints.md && <PageNav links={links} />}
      </div>
    </div>
  );
};

export default Middle;
