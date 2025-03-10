import Link from "../../Link";
import Logo from "../../../components/Icons/Logo";
import Button from "../../Buttons/Button";
import ArrowNav from "./ArrowNav";
import { usePalette } from "../../Pages/Deck/DeckPaletteContext";

const Middle = ({
  showSiteNav,
  altNav,
}: {
  showSiteNav: "top" | "afterTop";
  altNav: boolean;
}) => {
  const { palette } = usePalette();
  return (
    <div
      css={(theme) => ({
        transition: theme.transitions.normal("top"),
        flexGrow: 1,
        gridColumn: "span 6",
        position: "relative",
        height: "100%",
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
            "@keyframes ScandiLineExtend": {
              "0%": {
                width: 0,
              },
              "100%": {
                width: "100%",
              },
            },
            animation: "ScandiLineExtend 4000ms forwards linear",
          },
        ]}
        style={{
          ...((showSiteNav === "afterTop" && {
            borderColor: "transparent",
          }) ||
            {}),
        }}
      />
      <div
        css={(theme) => [
          {
            color: theme.colors.dark_gray,
            height: "200%",
            position: "relative",
            top: 0,
            transition: theme.transitions.fast("top"),
          },
        ]}
        style={
          (showSiteNav !== "top" &&
            altNav && {
              top: "-100%",
            }) ||
          {}
        }
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
          <ArrowNav />
        </div>
        <div
          css={[
            {
              height: "50%",
              gap: 10,
              display: "flex",
            },
          ]}
        >
          {["About", "Collection", "Gallery", "AR", "Reviews", "Podcast"].map(
            (name, i) => (
              <Button
                key={name + i}
                noColor={true}
                size="small"
                css={(theme) => [
                  {
                    display: "flex",
                    alignItems: "center",
                    color: theme.colors[palette === "dark" ? "white" : "black"],
                  },
                ]}
              >
                {name}
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Middle;
