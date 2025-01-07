import { useState } from "react";
import Button from "../../../components/Button";
import MenuIcon from "../../Icons/Menu";
import { theme } from "../../../pages/_app";

const MenuButton = () => {
  const [hover, setHover] = useState(false);

  return (
    <button
      css={{
        background: "none",
        position: "relative",
        padding: 0,
        alignItems: "center",
        border: "none",
        lineHeight: "42px",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        css={[
          {
            position: "relative",
          },
        ]}
      >
        <div
          css={(theme) => [
            {
              borderRadius: "100%",
              animation: "grow 2s 1",
              background: theme.colors.dark_gray,
              inset: 0,
              position: "absolute",
              transition: theme.transitions.fast(["scale"]),
              // "@keyframes grow": {
              //   "0%": {
              //     transform: "scale( 0 )",
              //   },
              //   "100%": {
              //     transform: "scale( 1 )",
              //   },
              // },
            },
          ]}
          style={{ scale: hover ? 1 : 0 }}
        />
        <MenuIcon
          css={(theme) => [
            {
              transition: theme.transitions.fast(["color"]),
              position: "relative",
              verticalAlign: "middle",
            },
          ]}
          style={{
            color: theme.colors[!hover ? "dark_gray" : "white"],
          }}
        />

        {/* <div
          css={(theme) => [
            {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: theme.colors.dark_gray,
              borderRadius: "100%",
              animationTimingFunction: "easeOut",
              animationDuration: "250ms",
              transitionProperty: "all",
              "&:hover": {
                width: "100%",
                height: "100%",
              },
            },
          ]}
        /> */}
      </div>
    </button>
  );
};

export default MenuButton;
