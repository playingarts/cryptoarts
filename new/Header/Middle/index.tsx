import Link from "../../Link";
import Logo from "../../../components/Icons/Logo";
import Button from "../../Buttons/Button";
import ArrowNav from "./ArrowNav";
import { usePalette } from "../../Pages/Deck/DeckPaletteContext";
import { FC, HTMLAttributes, ReactNode } from "react";
import { useSize } from "../../../components/SizeProvider";
import { breakpoints } from "../../../source/enums";

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
      <div
        css={(theme) => [
          {
            boxSizing: "content-box",
            borderTop:
              "1px solid " +
              (palette === "dark" ? theme.colors.white30 : "black"),
            position: "absolute",
            width: "100%",
            top: 0,
            left: 0,
            transition: theme.transitions.slow(["border-color"]),

            // animation: "ScandiLineExtend 4000ms forwards linear",
          },
        ]}
        style={{
          ...(((showSiteNav === "afterTop" || width < breakpoints.sm) && {
            borderColor: "transparent",
          }) ||
            {}),
        }}
      />
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
            href="/"
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
