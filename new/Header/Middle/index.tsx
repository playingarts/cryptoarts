import Link from "../../Link";
import Logo from "../../../components/Icons/Logo";
import ButtonTemplate from "../../Buttons/ButtonTemplate";
import ArrowNav from "./ArrowNav";

const Middle = ({
  showSiteNav,
  altNav,
}: {
  showSiteNav: "top" | "afterTop";
  altNav: boolean;
}) => {
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
            borderTop: "1px solid black",
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
          css={[
            {
              height: "50%",
              display: "flex",
              "> *": {
                flexGrow: 1,
              },
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
              <ButtonTemplate
                key={name + i}
                css={(theme) => [
                  {
                    height: "100%",
                    fontSize: 20,
                    fontWeight: 400,
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                    padding: "0 12px",
                    color: theme.colors.dark_gray,
                  },
                ]}
              >
                {name}
              </ButtonTemplate>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Middle;
